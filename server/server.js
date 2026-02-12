// Simple server bootstrap (replaces missing app.js in this branch).
// This file creates an Express app and mounts admin routes needed by the client.
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const misReminderRoutes = require('./routes/misReminderRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Mount admin API routes under /api/admin
app.use('/api/admin', misReminderRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server (minimal) listening on port ${PORT}`);
});

// Start MIS reminder scheduler (best-effort)
try {
    const { start } = require('./services/misReminderScheduler');
    start();
} catch (e) {
    console.error('Failed to start MIS reminder scheduler', e);
}
