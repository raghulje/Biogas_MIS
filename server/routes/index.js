const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const misRoutes = require('./misRoutes');
const adminRoutes = require('./adminRoutes');

router.use('/auth', authRoutes);
router.use('/', misRoutes); // misRoutes handles /mis-entries, /dashboard, etc. directly
router.use('/admin', adminRoutes);

// Sync routes
router.get('/sync/preview', (req, res) => res.json({ message: 'Sync Preview' }));
router.post('/sync/confirm', (req, res) => res.json({ message: 'Sync Confirmed' }));

module.exports = router;
