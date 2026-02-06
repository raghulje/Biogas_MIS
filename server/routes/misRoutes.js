const express = require('express');
const router = express.Router();
const misController = require('../controllers/misController');
const misExtensions = require('../controllers/misControllerExtensions');
const authMiddleware = require('../middleware/authMiddleware');
const permissionMiddleware = require('../middleware/permissionMiddleware');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// Middleware applied to all MIS routes
router.use(authMiddleware);

// Daily Entries - CRUD
router.post('/mis-entries', permissionMiddleware('mis_entry', 'create'), misController.createEntry);
router.get('/mis-entries/consolidated', permissionMiddleware('mis_entry', 'read'), misExtensions.getConsolidatedData);
router.get('/mis-entries', permissionMiddleware('mis_entry', 'read'), misController.getEntries);
router.get('/mis-entries/:id', permissionMiddleware('mis_entry', 'read'), misController.getEntryById);
router.put('/mis-entries/:id', permissionMiddleware('mis_entry', 'update'), misExtensions.updateEntry);
router.delete('/mis-entries/:id', permissionMiddleware('mis_entry', 'delete'), misExtensions.deleteEntry);

// Workflow
router.post('/mis-entries/:id/submit', permissionMiddleware('mis_entry', 'submit'), misController.submitEntry);
router.post('/mis-entries/:id/approve', permissionMiddleware('mis_entry', 'approve'), misController.approveEntry);
router.post('/mis-entries/:id/reject', permissionMiddleware('mis_entry', 'approve'), misController.rejectEntry);

// Import/Export
router.post('/mis-entries/import', permissionMiddleware('mis_entry', 'import'), upload.single('file'), misExtensions.importEntries);
router.get('/mis-entries/export', permissionMiddleware('mis_entry', 'read'), misExtensions.exportEntries);

// Dashboard
router.get('/dashboard/daily', misExtensions.getDashboardData);

module.exports = router;
