const express = require('express');
const router = express.Router();
const controller = require('../controllers/misReminderController');

// GET current reminder config
router.get('/mis-reminder-config', controller.getMISReminderConfig);

// PUT update reminder config
router.put('/mis-reminder-config', controller.saveMISReminderConfig);

module.exports = router;

