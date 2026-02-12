// Main app bootstrap - initializes DB, models, routes, schedulers and starts the server.
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./models'); // loads models/index.js

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Mount admin routes if present
try {
  const adminRoutes = require('./routes/misReminderRoutes'); // mis reminder
  app.use('/api/admin', adminRoutes);
} catch (e) {
  console.warn('misReminderRoutes not mounted:', e.message);
}

// Try mounting other admin-related route modules if they exist
const tryMount = (relPath, mountPath) => {
  try {
    const r = require(relPath);
    app.use(mountPath, r);
  } catch (e) {
    // ignore missing
  }
};
tryMount('./routes/emailTemplateRoutes', '/api/admin');
tryMount('./routes/adminRoutes', '/api/admin');

// Health endpoint
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

const PORT = process.env.PORT || 5001;

async function start() {
  try {
    // Sync DB (non-destructive). In production it's recommended to run migrations instead.
    await db.sequelize.authenticate();
    console.log('Database connected.');
    if (process.env.SKIP_DB_SYNC !== 'true') {
      await db.sequelize.sync({ alter: true });
      console.log('Database synced (alter).');
    } else {
      console.log('Skipping DB sync because SKIP_DB_SYNC=true');
    }

    // Start schedulers (if available)
    try {
      const reminder = require('./services/misReminderScheduler');
      if (reminder && typeof reminder.start === 'function') reminder.start();
    } catch (e) {
      console.warn('MIS reminder scheduler not started:', e.message);
    }

    // Start HTTP server
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start app', err);
    process.exit(1);
  }
}

start();

module.exports = app;

