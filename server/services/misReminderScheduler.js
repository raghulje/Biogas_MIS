const cron = require('node-cron');
const nodemailer = require('nodemailer');
const { AppConfig } = require('../models');

// In-memory map to track which reminder times have been sent for a given date
const sentMap = new Set(); // keys: YYYY-MM-DD|HH:MM

function parseTimeString(t) {
    if (!t) return null;
    const [h, m] = t.split(':').map(Number);
    if (Number.isNaN(h) || Number.isNaN(m)) return null;
    return { h, m };
}

async function loadConfig() {
    const row = await AppConfig.findOne({ where: { key: 'mis_reminder_config' } });
    if (!row || !row.value) return null;
    try {
        return JSON.parse(row.value);
    } catch (e) {
        return null;
    }
}

function createTransporter() {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT || 587),
        secure: (process.env.SMTP_SECURE === 'true') || false,
        auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
    });
}

function formatHM(d) {
    return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}

async function checkAndSend() {
    try {
        const cfg = await loadConfig();
        if (!cfg || !cfg.enabled) return;

        // Compute scheduled reminder times (based on reminder_start_time, interval, count)
        if (!cfg.reminder_start_time) return;
        const start = parseTimeString(cfg.reminder_start_time);
        if (!start) return;
        const interval = Number(cfg.reminder_interval_minutes) || 60;
        const count = Number(cfg.reminder_count) || 1;

        const today = new Date();
        const yyyy = today.toISOString().slice(0,10);

        // Build list of times
        const times = [];
        let curH = start.h;
        let curM = start.m;
        for (let i=0;i<count;i++){
            times.push({ h: curH, m: curM });
            // add interval minutes
            const dt = new Date();
            dt.setHours(curH, curM, 0, 0);
            dt.setMinutes(dt.getMinutes() + interval);
            curH = dt.getHours();
            curM = dt.getMinutes();
        }

        const now = new Date();
        const nowHM = { h: now.getHours(), m: now.getMinutes() };

        for (const t of times) {
            if (t.h === nowHM.h && t.m === nowHM.m) {
                const key = `${yyyy}|${String(t.h).padStart(2,'0')}:${String(t.m).padStart(2,'0')}`;
                if (sentMap.has(key)) {
                    return;
                }

                // Optionally check if MIS submitted for today - best-effort
                let submitted = false;
                try {
                    const models = require('../models');
                    const MISDailyEntry = models.MISDailyEntry || models.MISBiogasData || null;
                    if (MISDailyEntry) {
                        const where = { date: new Date().toISOString().slice(0,10) };
                        // Try common field 'status' equals 'submitted'
                        const entry = await MISDailyEntry.findOne({ where });
                        if (entry && (entry.status === 'submitted' || entry.is_submitted || entry.submitted_at)) {
                            submitted = true;
                        }
                    }
                } catch (e) {
                    // ignore model errors
                }

                if (submitted) {
                    // stop further reminders for today
                    sentMap.add(key);
                    return;
                }

                // Send reminders to configured recipients
                const recipients = Array.isArray(cfg.reminder_recipient_emails) ? cfg.reminder_recipient_emails : [];
                if (!recipients.length) {
                    sentMap.add(key);
                    return;
                }

                const transporter = createTransporter();
                const from = process.env.SMTP_FROM || 'noreply@biogas.com';
                const subject = cfg.reminder_subject || `MIS Entry Reminder for ${yyyy}`;
                const body = cfg.reminder_body || `Hello,\n\nPlease submit the MIS entry for ${yyyy}.\n\nRegards,\nBioGas MIS`;

                for (const to of recipients) {
                    try {
                        await transporter.sendMail({ from, to, subject, text: body });
                    } catch (err) {
                        console.error('Failed to send reminder to', to, err && err.message);
                    }
                }

                sentMap.add(key);
            }
        }
    } catch (err) {
        console.error('misReminderScheduler error', err);
    }
}

function start() {
    // Run check every minute
    cron.schedule('* * * * *', () => {
        checkAndSend();
    }, { timezone: 'Asia/Kolkata' });
    console.log('MIS reminder scheduler started (checking every minute, timezone Asia/Kolkata)');
}

module.exports = { start };

