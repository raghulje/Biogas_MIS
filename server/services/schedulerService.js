const cron = require('node-cron');
const { EmailScheduler, MISDailyEntry, User, Role, MISEmailConfig, FinalMISReportConfig } = require('../models');
const emailService = require('./emailService');
const finalMISReportEmailService = require('./finalMISReportEmailService');
const { Op } = require('sequelize');
const reminderScheduler = require('./reminderScheduler');

function parseReportEmails(val) {
    if (Array.isArray(val)) return val.filter(Boolean).map(String).map(s => s.trim()).filter(Boolean);
    if (typeof val === 'string') {
        try {
            const a = JSON.parse(val);
            return Array.isArray(a) ? a.map(String).map(s => s.trim()).filter(Boolean) : val.split(/[,;]/).map(s => s.trim()).filter(Boolean);
        } catch {
            return val.split(/[,;]/).map(s => s.trim()).filter(Boolean);
        }
    }
    return [];
}

class SchedulerService {
    constructor() {
        this.jobs = new Map();
        this.finalMISReportHourlyJob = null;
    }

    async init() {
        console.log('Initializing Scheduler Service...');
        const schedulers = await EmailScheduler.findAll({ where: { is_active: true } });
        schedulers.forEach(scheduler => {
            this.scheduleJob(scheduler);
        });
        // Initialize reminder scheduler (dynamic MIS reminders)
        try {
            await reminderScheduler.init();
            console.log('Reminder Scheduler initialized.');
        } catch (e) {
            console.error('Reminder Scheduler init failed:', e);
        }
        // Final MIS Report: run every hour and send if config is due
        this.finalMISReportHourlyJob = cron.schedule('0 * * * *', async () => {
            try {
                await this.runFinalMISReportCheck();
            } catch (e) {
                console.error('Final MIS Report scheduled job failed:', e);
            }
        });
        console.log('Final MIS Report hourly check scheduled.');
    }

    scheduleJob(scheduler) {
        if (this.jobs.has(scheduler.id)) {
            this.jobs.get(scheduler.id).stop();
        }

        console.log(`Scheduling job: ${scheduler.name} with cron: ${scheduler.cron_expression}`);

        // Validate cron expression
        if (!cron.validate(scheduler.cron_expression)) {
            console.error(`Invalid cron expression for scheduler ${scheduler.name}`);
            return;
        }

        const job = cron.schedule(scheduler.cron_expression, async () => {
            console.log(`Running scheduled job: ${scheduler.name}`);
            try {
                await this.executeJob(scheduler);
            } catch (err) {
                console.error(`Scheduled job '${scheduler.name}' failed:`, err);
            }
        });

        this.jobs.set(scheduler.id, job);
    }

    async executeJob(scheduler) {
        const today = new Date().toISOString().split('T')[0];
        console.log(`Executing scheduler job_type='${scheduler.job_type}' for date=${today}`);
        const { EmailTemplate } = require('../models');

        try {
            if (scheduler.job_type === 'daily_reminder') {
                // Check if entries exist for today
                const entries = await MISDailyEntry.findAll({
                    where: { date: today }
                });

                const entryCreated = entries.length > 0;
                const entrySubmitted = entries.some(e => e.status === 'submitted' || e.status === 'approved' || e.status === 'under_review');

                // No entry for today: send to Admin-configured list, or fallback to Operators
                if (!entryCreated) {
                    let noEntryEmails = [];
                    try {
                        const configRow = await MISEmailConfig.findByPk(1);
                        const parse = (s) => { try { const a = JSON.parse(s || '[]'); return Array.isArray(a) ? a : []; } catch { return []; } };
                        noEntryEmails = configRow ? parse(configRow.entry_not_created_emails) : [];
                    } catch (_) { /* ignore */ }
                    if (noEntryEmails.length === 0) {
                        const operatorRole = await Role.findOne({ where: { name: 'Operator' } });
                        const operators = operatorRole ? await User.findAll({ where: { role_id: operatorRole.id, is_active: true } }) : [];
                        noEntryEmails = operators.map(o => o.email).filter(Boolean);
                    }
                    const template = await EmailTemplate.findOne({ where: { name: 'mis_no_entry_reminder' } });
                    const subject = template?.subject || 'MIS Entry Reminder: No Entry Created for ' + today;
                    const body = template ? await emailService.replaceTemplateVariables(template.body, { name: 'Recipient', date: today })
                        : `<p>Hello,</p><p>No MIS entry has been created for today (${today}). Please ensure an entry is created.</p>`;
                    for (const email of noEntryEmails) {
                        const addr = String(email).trim();
                        if (addr) {
                            try { await emailService.sendEmail(addr, subject, body); } catch (err) { console.error('No-entry reminder email failed for', addr, err.message); }
                        }
                    }
                }

                const operatorRole = await Role.findOne({ where: { name: 'Operator' } });
                const operators = operatorRole ? await User.findAll({ where: { role_id: operatorRole.id, is_active: true } }) : [];
                const managerRole = await Role.findOne({ where: { name: 'Manager' } });
                const managers = managerRole ? await User.findAll({ where: { role_id: managerRole.id, is_active: true } }) : [];

                if (entryCreated && !entrySubmitted) {
                    const template = await EmailTemplate.findOne({ where: { name: 'mis_pending_submission' } });
                    for (const op of operators) {
                        const subject = template?.subject || 'MIS Entry Reminder: Please Submit Entry';
                        const body = template ? await emailService.replaceTemplateVariables(template.body, { name: op.name, date: today })
                            : `<p>Hello ${op.name},</p><p>The MIS entry for ${today} is in Draft status. Please submit it.</p>`;
                        await emailService.sendEmail(op.email, subject, body);
                    }
                }

                if (entryCreated && entrySubmitted) {
                    const template = await EmailTemplate.findOne({ where: { name: 'mis_entry_submitted_notify' } });
                    for (const mgr of managers) {
                        const subject = template?.subject || 'MIS Entry Submitted';
                        const body = template ? await emailService.replaceTemplateVariables(template.body, { name: mgr.name, date: today })
                            : `<p>Hello ${mgr.name},</p><p>An MIS entry for ${today} has been submitted for review.</p>`;
                        await emailService.sendEmail(mgr.email, subject, body);
                    }
                }
            } else if (scheduler.job_type === 'mis_creation_check') {
                // 16:45 Check: Entry created? Submitted?
                const entries = await MISDailyEntry.findAll({ where: { date: today } });
                const entryCreated = entries.length > 0;
                const entrySubmitted = entries.some(e => ['submitted', 'approved', 'under_review'].includes(e.status));

                // Get Recipients: Config + Site Users
                let siteUserEmails = [];
                try {
                    const configRow = await MISEmailConfig.findByPk(1);
                    const parse = (s) => { try { const a = JSON.parse(s || '[]'); return Array.isArray(a) ? a : []; } catch { return []; } };
                    if (configRow) {
                        // For "Not Created" scenario
                        if (!entryCreated) siteUserEmails = [...siteUserEmails, ...parse(configRow.entry_not_created_emails)];
                        // For "Not Submitted" scenario
                        if (entryCreated && !entrySubmitted) siteUserEmails = [...siteUserEmails, ...parse(configRow.not_submitted_notify_emails)];
                    }
                } catch (_) { }

                // Fallback/Addition: Role 'Site User' or 'Operator'
                const roles = await Role.findAll({ where: { name: { [Op.in]: ['Site User', 'Operator'] } } });
                for (const role of roles) {
                    const users = await User.findAll({ where: { role_id: role.id, is_active: true } });
                    siteUserEmails = [...siteUserEmails, ...users.map(u => u.email)];
                }
                const uniqueEmails = [...new Set(siteUserEmails.filter(Boolean))];

                if (!entryCreated) {
                    const template = await EmailTemplate.findOne({ where: { name: 'mis_not_created' } });
                    const subject = template?.subject || `MIS Entry Missing for ${today}`;
                    for (const email of uniqueEmails) {
                        const body = template ? await emailService.replaceTemplateVariables(template.body, { date: today })
                            : `<p>Hello,</p><p>The MIS entry for ${today} has NOT been created yet. Please create it immediately.</p>`;
                        await emailService.sendEmail(email, subject, body);
                    }
                } else if (!entrySubmitted) {
                    const template = await EmailTemplate.findOne({ where: { name: 'mis_not_submitted' } });
                    const subject = template?.subject || `MIS Entry Draft for ${today}`;
                    for (const email of uniqueEmails) {
                        const body = template ? await emailService.replaceTemplateVariables(template.body, { date: today })
                            : `<p>Hello,</p><p>The MIS entry for ${today} is created but NOT submitted. Please submit it immediately.</p>`;
                        await emailService.sendEmail(email, subject, body);
                    }
                }

            } else if (scheduler.job_type === 'mis_escalation_check') {
                // 17:30 Check: Entry submitted? If not, notify Managers.
                const entries = await MISDailyEntry.findAll({ where: { date: today } });
                const entrySubmitted = entries.some(e => ['submitted', 'approved', 'under_review'].includes(e.status));

                if (!entrySubmitted) {
                    let managerEmails = [];
                    try {
                        const configRow = await MISEmailConfig.findByPk(1);
                        const parse = (s) => { try { const a = JSON.parse(s || '[]'); return Array.isArray(a) ? a : []; } catch { return []; } };
                        if (configRow) managerEmails = parse(configRow.escalation_notify_emails);
                    } catch (_) { }

                    const managerRole = await Role.findOne({ where: { name: 'Manager' } });
                    if (managerRole) {
                        const users = await User.findAll({ where: { role_id: managerRole.id, is_active: true } });
                        managerEmails = [...managerEmails, ...users.map(u => u.email)];
                    }
                    const uniqueEmails = [...new Set(managerEmails.filter(Boolean))];

                    const template = await EmailTemplate.findOne({ where: { name: 'mis_escalation' } });
                    const subject = template?.subject || `ESCALATION: MIS Entry Missing/Draft for ${today}`;
                    for (const email of uniqueEmails) {
                        const body = template ? await emailService.replaceTemplateVariables(template.body, { date: today })
                            : `<p>Hello Manager,</p><p>The MIS entry for ${today} is overdue (not submitted). Please check with the team.</p>`;
                        await emailService.sendEmail(email, subject, body);
                    }
                }
            }
        } catch (error) {
            console.error('Error executing job:', error);
        }
    }

    async refresh() {
        // Clear all existing jobs properly
        for (const job of this.jobs.values()) {
            job.stop();
        }
        this.jobs.clear();
        if (this.finalMISReportHourlyJob) {
            this.finalMISReportHourlyJob.stop();
            this.finalMISReportHourlyJob = null;
        }
        // Refresh reminder scheduler too
        try {
            await reminderScheduler.refresh();
        } catch (e) {
            console.error('Failed to refresh reminder scheduler:', e);
        }
        await this.init();
    }
    async runFinalMISReportCheck() {
        try {
            const { FinalMISReportConfig } = require('../models');
            const row = await FinalMISReportConfig.findByPk(1);
            if (!row || !row.is_active || !row.to_emails) return;

            const config = {
                schedule_type: row.schedule_type,
                schedule_time: row.schedule_time,
                cron_expression: row.cron_expression,
            };

            const due = finalMISReportEmailService.isDueNow(config.schedule_type, config.schedule_time);
            if (!due) return;

            const dateRange = finalMISReportEmailService.getDateRangeForSchedule(config.schedule_type, config.schedule_time);
            if (!dateRange) return;

            const { startDate, endDate } = dateRange;

            const toList = parseReportEmails(row.to_emails);
            if (!toList.length) return;

            const replacements = {
                '{{report_period}}': `${startDate} to ${endDate}`,
                '{{from_date}}': startDate,
                '{{to_date}}': endDate,
                '{{generated_datetime}}': new Date().toLocaleString()
            };
            const replacePlaceholders = (text, map) => {
                if (!text) return '';
                let result = text;
                for (const [key, value] of Object.entries(map)) {
                    result = result.replace(new RegExp(key, 'g'), value);
                    result = result.replace(new RegExp(`{{\\s*${key.replace(/{|}/g, '')}\\s*}}`, 'g'), value);
                }
                return result.replace(/{{\s*(\w+)\s*}}/g, (match, key) => map[`{{${key}}}`] || map[key] || match);
            };

            const subject = replacePlaceholders(row.subject || 'Final MIS Report for {{report_period}}', replacements);
            const customBody = replacePlaceholders(row.body || '', replacements);

            const html = await finalMISReportEmailService.buildReportHtmlForRange(startDate, endDate, customBody);

            for (const email of toList) {
                await emailService.sendEmail(email, subject, html);
            }

            await row.update({ last_sent_at: new Date() });
            console.log(`Final MIS Report Sent to ${toList.length} recipients.`);

        } catch (error) {
            console.error('runFinalMISReportCheck Error:', error);
        }
    }
}

module.exports = new SchedulerService();
