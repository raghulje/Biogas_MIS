const nodemailer = require('nodemailer');
const { SMTPConfig, EmailLog } = require('../models');

class EmailService {
    async getTransporter() {
        const config = await SMTPConfig.findOne({ where: { is_active: true } });
        if (!config) {
            throw new Error('No active SMTP configuration found');
        }

        return nodemailer.createTransport({
            host: config.host,
            port: config.port,
            secure: config.secure,
            auth: {
                user: config.auth_user,
                pass: config.auth_pass
            }
        });
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
            const info = await transporter.sendMail({
                from: config.from_email,
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
