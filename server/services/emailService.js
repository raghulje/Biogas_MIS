const nodemailer = require('nodemailer');
const { SMTPConfig, EmailLog } = require('../models');

function buildFrom(config) {
    const name = config.from_name && config.from_name.trim();
    if (name) return `"${name.replace(/"/g, '')}" <${config.from_email}>`;
    return config.from_email;
}

// Port 465 = implicit SSL (secure: true). Port 587/25 = STARTTLS (secure: false); wrong version error if secure: true on 587.
function getTransportOptions(config) {
    const port = Number(config.port) || 587;
    const useSecure = port === 465 || (Boolean(config.secure) && port === 465);
    return {
        host: config.host,
        port,
        secure: useSecure,
        auth: {
            user: config.auth_user,
            pass: config.auth_pass
        }
    };
}

class EmailService {
    constructor() {
        this.transporter = null;
        this.lastConfigId = null;
    }

    async getTransporter() {
        const config = await SMTPConfig.findOne({ where: { is_active: true } });
        if (!config) {
            throw new Error('No active SMTP configuration found');
        }

        // Reuse transporter if config hasn't changed
        if (this.transporter && this.lastConfigId === config.id) {
            return this.transporter;
        }

        this.transporter = nodemailer.createTransport(getTransportOptions(config));
        this.lastConfigId = config.id;
        return this.transporter;
    }

    /** Create transporter from a config object (for test email without saving). */
    createTransporterFromConfig(config) {
        return nodemailer.createTransport(getTransportOptions(config));
    }

    async sendEmail(to, subject, html) {
        let transporter;
        try {
            transporter = await this.getTransporter();
        } catch (error) {
            console.error('Email Service Error: Could not get transporter', error);
            await EmailLog.create({
                recipient: to,
                subject: subject,
                status: 'failed',
                error_message: error.message
            });
            return false;
        }

        try {
            const config = await SMTPConfig.findOne({ where: { is_active: true } });
            const from = buildFrom(config);
            const info = await transporter.sendMail({
                from,
                to,
                subject,
                html
            });

            console.log('Message sent: %s', info.messageId);

            await EmailLog.create({
                recipient: to,
                subject: subject,
                status: 'sent'
            });

            return true;
        } catch (error) {
            console.error('Error sending email:', error);
            await EmailLog.create({
                recipient: to,
                subject: subject,
                status: 'failed',
                error_message: error.message
            });
            return false;
        }
    }

    /**
     * Send a test email using provided config (e.g. from SMTP test form).
     * Does not use stored config; config must have host, port, auth_user, auth_pass, from_email.
     * @param {Object} config - { host, port, secure, auth_user, auth_pass, from_email, from_name? }
     * @param {string} to - Recipient email
     * @returns {{ success: boolean, messageId?: string, error?: string }}
     */
    async sendTestEmail(config, to) {
        if (!config || !config.host || !config.auth_user || !config.auth_pass || !config.from_email || !to) {
            return { success: false, error: 'Missing required config or recipient' };
        }
        try {
            const transporter = this.createTransporterFromConfig(config);
            const from = buildFrom(config);
            const info = await transporter.sendMail({
                from,
                to: to.trim(),
                subject: 'Test Email – Biogas MIS SMTP Configuration',
                html: '<p>This is a test email from <strong>Biogas MIS</strong>.</p><p>If you received this, your SMTP configuration is working correctly.</p>',
                text: 'This is a test email from Biogas MIS. If you received this, your SMTP configuration is working correctly.'
            });
            return { success: true, messageId: info.messageId };
        } catch (error) {
            console.error('Send test email error:', error);
            return { success: false, error: error.message || 'Failed to send' };
        }
    }

    async replaceTemplateVariables(templateBody, variables) {
        let body = templateBody;
        for (const key in variables) {
            const regex = new RegExp(`{{${key}}}`, 'g');
            body = body.replace(regex, variables[key]);
        }
        return body;
    }
}

module.exports = new EmailService();
