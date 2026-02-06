const cron = require('node-cron');
const { EmailScheduler, MISDailyEntry, User, Role } = require('../models');
const emailService = require('./emailService');
const { Op } = require('sequelize');

class SchedulerService {
    constructor() {
        this.jobs = new Map();
    }

    async init() {
        console.log('Initializing Scheduler Service...');
        const schedulers = await EmailScheduler.findAll({ where: { is_active: true } });
        schedulers.forEach(scheduler => {
            this.scheduleJob(scheduler);
        });
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
            await this.executeJob(scheduler);
        });

        this.jobs.set(scheduler.id, job);
    }

    async executeJob(scheduler) {
        const today = new Date().toISOString().split('T')[0];
        const { EmailTemplate } = require('../models');

        try {
            if (scheduler.job_type === 'daily_reminder') {
                // Check if entries exist for today
                const entries = await MISDailyEntry.findAll({
                    where: { date: today }
                });

                const entryCreated = entries.length > 0;
                const entrySubmitted = entries.some(e => e.status === 'Submitted' || e.status === 'Approved');

                // Get Operators
                const operatorRole = await Role.findOne({ where: { name: 'Operator' } });
                const operators = operatorRole ? await User.findAll({ where: { role_id: operatorRole.id, is_active: true } }) : [];

                // Get Managers
                const managerRole = await Role.findOne({ where: { name: 'Manager' } });
                const managers = managerRole ? await User.findAll({ where: { role_id: managerRole.id, is_active: true } }) : [];

                if (!entryCreated) {
                    const template = await EmailTemplate.findOne({ where: { name: 'mis_no_entry_reminder' } });
                    for (const op of operators) {
                        const subject = template?.subject || 'MIS Entry Reminder: No Entry Created';
                        const body = template ? await emailService.replaceTemplateVariables(template.body, { name: op.name, date: today })
                            : `<p>Hello ${op.name},</p><p>This is a reminder that no MIS entry has been created for today (${today}). Please create it.</p>`;
                        await emailService.sendEmail(op.email, subject, body);
                    }
                } else if (!entrySubmitted) {
                    const template = await EmailTemplate.findOne({ where: { name: 'mis_pending_submission' } });
                    for (const op of operators) {
                        const subject = template?.subject || 'MIS Entry Reminder: Please Submit Entry';
                        const body = template ? await emailService.replaceTemplateVariables(template.body, { name: op.name, date: today })
                            : `<p>Hello ${op.name},</p><p>The MIS entry for ${today} is in Draft status. Please submit it.</p>`;
                        await emailService.sendEmail(op.email, subject, body);
                    }
                }

                if (entrySubmitted) {
                    const template = await EmailTemplate.findOne({ where: { name: 'mis_entry_submitted_notify' } });
                    for (const mgr of managers) {
                        const subject = template?.subject || 'MIS Entry Submitted';
                        const body = template ? await emailService.replaceTemplateVariables(template.body, { name: mgr.name, date: today })
                            : `<p>Hello ${mgr.name},</p><p>An MIS entry for ${today} has been submitted for review.</p>`;
                        await emailService.sendEmail(mgr.email, subject, body);
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
        await this.init();
    }
}

module.exports = new SchedulerService();
