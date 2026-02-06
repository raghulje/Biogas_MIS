const {
    User, Role, Permission, RolePermission,
    SMTPConfig, EmailScheduler, AuditLog, EmailTemplate
} = require('../models');
const auditService = require('../services/auditService');
const schedulerService = require('../services/schedulerService');

// --- User Management ---

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [{ model: Role, as: 'role', include: [{ model: Permission, as: 'permissions' }] }],
            attributes: { exclude: ['password'] }
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
};

// createUser is handled in authController for now, but admins usually create users too.

// --- Role Management ---

exports.getRoles = async (req, res) => {
    try {
        const roles = await Role.findAll({ include: [{ model: Permission, as: 'permissions' }] });
        res.json(roles);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.createRole = async (req, res) => {
    try {
        const role = await Role.create(req.body);
        res.status(201).json(role);
    } catch (err) { res.status(500).json(err); }
};

exports.assignPermissions = async (req, res) => {
    try {
        const { roleId, permissionIds } = req.body; // permissionIds is array
        const role = await Role.findByPk(roleId);
        if (!role) return res.status(404).json({ message: 'Role not found' });

        // Reset permissions
        await RolePermission.destroy({ where: { role_id: roleId } });

        // Add new
        const bulkData = permissionIds.map(pid => ({ role_id: roleId, permission_id: pid }));
        await RolePermission.bulkCreate(bulkData);

        res.json({ message: 'Permissions updated' });
    } catch (error) {
        res.status(500).json(error);
    }
};

// --- Configuration ---

exports.getSMTPConfig = async (req, res) => {
    try {
        const config = await SMTPConfig.findOne({ where: { is_active: true } });
        res.json(config);
    } catch (err) { res.status(500).json(err); }
};

exports.createSMTPConfig = async (req, res) => {
    try {
        // Deactivate others
        await SMTPConfig.update({ is_active: false }, { where: {} });
        const config = await SMTPConfig.create(req.body);

        await auditService.log(req.user.id, 'UPDATE_SMTP_CONFIG', 'SMTPConfig', config.id, null, req.body, req);
        res.status(201).json(config);
    } catch (err) { res.status(500).json(err); }
};

exports.updateSMTPConfig = async (req, res) => {
    try {
        const { id } = req.params;
        await SMTPConfig.update(req.body, { where: { id } });
        res.json({ message: 'Updated' });
    } catch (err) { res.status(500).json(err); }
};

// --- Scheduler ---

exports.createScheduler = async (req, res) => {
    try {
        const scheduler = await EmailScheduler.create(req.body);
        // Refresh service
        await schedulerService.refresh();
        res.status(201).json(scheduler);
    } catch (err) { res.status(500).json(err); }
};

exports.getSchedulers = async (req, res) => {
    try {
        const list = await EmailScheduler.findAll();
        res.json(list);
    } catch (err) { res.status(500).json(err); }
};

// --- Logs ---

exports.getAuditLogs = async (req, res) => {
    try {
        const logs = await AuditLog.findAll({
            include: [{ model: User, as: 'actor', attributes: ['name'] }],
            order: [['created_at', 'DESC']],
            limit: 100
        });
        res.json(logs);
    } catch (error) {
        res.status(500).json(error);
    }
};
