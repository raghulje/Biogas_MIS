const { AppConfig } = require('../models');

// Key used to store reminder config in app_config table
const CONFIG_KEY = 'mis_reminder_config';

exports.getMISReminderConfig = async (req, res) => {
    try {
        const row = await AppConfig.findOne({ where: { key: CONFIG_KEY } });
        const value = row && row.value ? JSON.parse(row.value) : {
            enabled: false,
            fill_start_time: null,
            fill_end_time: null,
            reminder_start_time: null,
            reminder_interval_minutes: 60,
            reminder_count: 4,
            reminder_recipient_emails: [],
            timezone: 'Asia/Kolkata'
        };
        res.json(value);
    } catch (err) {
        console.error('getMISReminderConfig error', err);
        res.status(500).json({ message: 'Failed to read MIS reminder config' });
    }
};

exports.saveMISReminderConfig = async (req, res) => {
    try {
        const payload = req.body || {};
        // Basic validation / sanitize
        const cfg = {
            enabled: !!payload.enabled,
            fill_start_time: payload.fill_start_time || null,
            fill_end_time: payload.fill_end_time || null,
            reminder_start_time: payload.reminder_start_time || null,
            reminder_interval_minutes: Number(payload.reminder_interval_minutes) || 60,
            reminder_count: Number(payload.reminder_count) || 4,
            reminder_recipient_emails: Array.isArray(payload.reminder_recipient_emails) ? payload.reminder_recipient_emails : [],
            timezone: payload.timezone || 'Asia/Kolkata'
        };

        const [row, created] = await AppConfig.findOrCreate({
            where: { key: CONFIG_KEY },
            defaults: { value: JSON.stringify(cfg) }
        });
        if (!created) {
            await row.update({ value: JSON.stringify(cfg) });
        }

        res.json({ message: 'MIS reminder config saved', config: cfg });
    } catch (err) {
        console.error('saveMISReminderConfig error', err);
        res.status(500).json({ message: 'Failed to save MIS reminder config' });
    }
};

module.exports = exports;

