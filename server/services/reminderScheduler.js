const cron = require('node-cron');
const { NotificationSchedule, MISDailyEntry, User, Role } = require('../models');
const emailService = require('./emailService');
const { Op } = require('sequelize');

class ReminderScheduler {
  constructor() {
    this.jobs = new Map(); // jobKey -> cron job
    this.scheduleJobs = new Map(); // scheduleId -> [jobKeys]
  }

  async init() {
    console.log('Initializing Reminder Scheduler...');
    // Clear existing jobs
    this.clearJobs();
    // Load all active schedules
    const schedules = await NotificationSchedule.findAll({ where: { is_active: true }, order: [['id', 'ASC']] });
    if (!schedules || schedules.length === 0) {
      console.log('No active notification schedules found.');
      return;
    }
    for (const sched of schedules) {
      await this._scheduleFor(sched);
    }
  }

  async _scheduleFor(row) {
    if (!row) return;
    const scheduleId = row.id;
    const misEnd = row.mis_end_time;
    const interval = Number(row.reminder_interval_minutes) || 60;
    const count = Number(row.reminder_count) || 0;
    const [endH, endM] = String(misEnd || '00:00').split(':').map(s => Number(s));
    const base = new Date();
    base.setHours(endH || 0, endM || 0, 0, 0);

    const jobKeys = [];
    for (let i = 1; i <= count; i++) {
      const dt = new Date(base.getTime() + interval * 60000 * i);
      const h = dt.getHours();
      const m = dt.getMinutes();
      const cronExpr = `${m} ${h} * * *`;
      const jobKey = `reminder_${scheduleId}_${i}`;
      if (!cron.validate(cronExpr)) {
        console.warn('Invalid cron expr for reminder:', cronExpr);
        continue;
      }
      // If job already exists, skip scheduling
      if (this.jobs.has(jobKey)) {
        jobKeys.push(jobKey);
        continue;
      }
      const job = cron.schedule(cronExpr, async () => {
        try {
          await this.runReminder(row, i);
        } catch (e) {
          console.error('Reminder job error:', e);
        }
      });
      this.jobs.set(jobKey, job);
      jobKeys.push(jobKey);
      console.log(`Scheduled reminder job ${jobKey} at ${h}:${String(m).padStart(2, '0')} (cron: ${cronExpr})`);
    }
    this.scheduleJobs.set(scheduleId, jobKeys);
  }

  async refreshAll() {
    this.clearJobs();
    await this.init();
  }

  async refreshSchedule(scheduleId) {
    // Remove jobs for that schedule and reschedule it
    if (!scheduleId) {
      return this.refreshAll();
    }
    const keys = this.scheduleJobs.get(scheduleId) || [];
    for (const k of keys) {
      const j = this.jobs.get(k);
      if (j) {
        try { j.stop(); } catch (e) { /* noop */ }
        this.jobs.delete(k);
      }
    }
    this.scheduleJobs.delete(scheduleId);
    // Load schedule and schedule it
    const sched = await NotificationSchedule.findByPk(scheduleId);
    if (sched && sched.is_active) {
      await this._scheduleFor(sched);
    }
  }

  /**
   * Entry date for reminder: plant shift day = 8:00 AM to 8:00 AM next day.
   * - Before 8:00 AM today: last completed shift ended yesterday 8 AM → entry date = (today - 2).
   * - At or after 8:00 AM today: last completed shift ended today 8 AM → entry date = (today - 1).
   * So reminder on 21/02 (e.g. after 8 AM) is for entry date 20/02; message "not submitted by deadline" reflects on 21/02.
   */
  getEntryDateForReminder() {
    const now = new Date();
    const hour = now.getHours();
    const d = new Date(now);
    if (hour < 8) {
      d.setDate(d.getDate() - 2);
    } else {
      d.setDate(d.getDate() - 1);
    }
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  async runReminder(scheduleRow, reminderIndex) {
    try {
      const entryDate = this.getEntryDateForReminder();
      console.log(`Reminder check for schedule ${scheduleRow.id} (reminder #${reminderIndex}) for entry_date=${entryDate}`);
      const entries = await MISDailyEntry.findAll({ where: { date: entryDate } });
      const entryCreated = Array.isArray(entries) && entries.length > 0;
      console.log('Checking MIS entry existence...', { entryCount: entries.length });
      const entrySubmitted = entryCreated && entries.some(e => ['submitted', 'approved', 'under_review'].includes(e && e.status));

      // If entry exists and is already submitted -> skip
      if (entrySubmitted) {
        console.log(`Reminder skipped (already submitted) [schedule ${scheduleRow.id} reminder ${reminderIndex}]`);
        return;
      }

      // Determine recipients: use MISEmailConfig or fallback to Operators
      const { MISEmailConfig } = require('../models');
      let toList = [];
      try {
        const cfg = await MISEmailConfig.findByPk(1) || await MISEmailConfig.findOne({ order: [['id', 'ASC']] });
        if (cfg) {
          const parse = (s) => {
            if (!s) return [];
            try {
              const a = JSON.parse(s);
              return Array.isArray(a) ? a : [s];
            } catch {
              return String(s).split(/[,;]/).map(e => e.trim()).filter(Boolean);
            }
          };
          toList = parse(cfg.not_submitted_notify_emails || '[]');
        }
      } catch (e) { /* ignore */ }

      if (!toList || toList.length === 0) {
        const opRole = await Role.findOne({ where: { name: 'Operator' } });
        if (opRole) {
          const users = await User.findAll({ where: { role_id: opRole.id, is_active: true } });
          toList = users.map(u => u.email).filter(Boolean);
        }
      }

      if (!toList || toList.length === 0) {
        console.warn('No recipients for reminder');
        return;
      }

      const { EmailTemplate } = require('../models');
      const template = await EmailTemplate.findOne({ where: { name: 'mis_not_submitted' } });
      const subject = template?.subject || `MIS Entry Reminder for ${entryDate}`;
      for (const to of toList) {
        try {
          const body = template ? await emailService.replaceTemplateVariables(template.body, { date: entryDate }) : `<p>Please submit MIS for ${entryDate} (data for this date is available from the next day).</p>`;
          await emailService.sendEmail(to, subject, body);
          console.log(`Reminder email sent to ${to} [schedule ${scheduleRow.id} #${reminderIndex}]`);
        } catch (e) {
          console.error('Failed to send reminder to', to, e.message);
        }
      }
    } catch (err) {
      console.error('runReminder error:', err);
    }
  }

  clearJobs() {
    for (const job of this.jobs.values()) {
      try { job.stop(); } catch (e) { /* noop */ }
    }
    this.jobs.clear();
  }

  async refresh() {
    this.clearJobs();
    await this.init();
  }
}

module.exports = new ReminderScheduler();

