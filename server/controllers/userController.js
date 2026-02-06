const { User, Role, Permission } = require('../models');
const auditService = require('../services/auditService');

// Create User
exports.createUser = async (req, res) => {
    try {
        const { name, email, password, role_id, is_active } = req.body;

        // Validation
        if (!name || !email || !password || !role_id) {
            return res.status(400).json({ message: 'Name, email, password, and role are required' });
        }

        const exists = await User.findOne({ where: { email } });
        if (exists) return res.status(400).json({ message: 'Email already exists' });

        const user = await User.create({ name, email, password, role_id, is_active: is_active ?? true });

        // Sync permissions if provided
        if (req.body.permissions && role_id) {
            await syncRolePermissions(role_id, req.body.permissions);
        }

        await auditService.log(req.user.id, 'CREATE_USER', 'User', user.id, null, { name, email, role_id }, req);

        res.status(201).json({
            message: 'User created successfully',
            user: { id: user.id, name: user.name, email: user.email, role_id: user.role_id }
        });
    } catch (error) {
        console.error('Create User Error:', error);
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

// Get User by ID
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, {
            include: [{ model: Role, as: 'role', include: [{ model: Permission, as: 'permissions' }] }],
            attributes: { exclude: ['password'] }
        });

        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        console.error('Get User Error:', error);
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
};

const syncRolePermissions = async (roleId, uiPermissions) => {
    if (!uiPermissions || !Array.isArray(uiPermissions)) return;

    // Map UI names to DB resources (page names from admin UI)
    const resourceMap = {
        'MIS Entry': 'mis_entry',
        'User Management': 'user',
        'Roles & Permissions': 'role',
        'Configurations': 'config',
        'Admin Panel': 'config',
        'Audit Logs': 'audit',
        'Import Data': 'mis_entry'
    };

    const role = await Role.findByPk(roleId);
    if (!role) return;

    const dbPermissions = [];
    for (const perm of uiPermissions) {
        const resource = resourceMap[perm.name];
        if (!resource) continue;

        if (perm.read) dbPermissions.push({ resource, action: 'read' });
        if (perm.create) dbPermissions.push({ resource, action: 'create' });
        if (perm.update) dbPermissions.push({ resource, action: 'update' });
        if (perm.delete) dbPermissions.push({ resource, action: 'delete' });
        if (resource === 'mis_entry' && perm.create) dbPermissions.push({ resource, action: 'submit' });
    }

    // Find all matching permission records in DB
    const permissionRecords = [];
    for (const p of dbPermissions) {
        const rec = await Permission.findOne({ where: { resource: p.resource, action: p.action } });
        if (rec) permissionRecords.push(rec);
    }

    // Update role permissions
    await role.setPermissions(permissionRecords);
};

// Update User
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, role_id, is_active, permissions } = req.body;

        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Store old values for audit
        const oldValues = user.toJSON();

        // Check email uniqueness if changed
        if (email && email !== user.email) {
            const exists = await User.findOne({ where: { email } });
            if (exists) return res.status(400).json({ message: 'Email already in use' });
        }

        await user.update({ name, email, role_id, is_active });

        // Sync permissions if provided
        if (permissions && role_id) {
            await syncRolePermissions(role_id, permissions);
        }

        await auditService.log(req.user.id, 'UPDATE_USER', 'User', id, oldValues, { name, email, role_id, is_active }, req);

        res.json({
            message: 'User updated successfully',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role_id: user.role_id,
                is_active: user.is_active
            }
        });
    } catch (error) {
        console.error('Update User Error:', error);
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

// Delete/Deactivate User (Soft Delete)
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Prevent deleting yourself
        if (Number(user.id) === Number(req.user.id)) {
            return res.status(400).json({ message: 'Cannot delete your own account' });
        }

        const oldValues = user.toJSON();

        // Soft delete - deactivate
        await user.update({ is_active: false });
        await auditService.log(req.user.id, 'DEACTIVATE_USER', 'User', id, oldValues, { is_active: false }, req);

        res.json({ message: 'User deactivated successfully' });
    } catch (error) {
        console.error('Delete User Error:', error);
        res.status(500).json({ message: 'Error deactivating user', error: error.message });
    }
};

// Activate User
exports.activateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await user.update({ is_active: true });
        await auditService.log(req.user.id, 'ACTIVATE_USER', 'User', id, null, { is_active: true }, req);

        res.json({ message: 'User activated successfully' });
    } catch (error) {
        console.error('Activate User Error:', error);
        res.status(500).json({ message: 'Error activating user', error: error.message });
    }
};

// Change User Password (Admin)
exports.changeUserPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { newPassword } = req.body;

        if (!newPassword || newPassword.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await user.update({ password: newPassword }); // Model hook will hash
        await auditService.log(req.user.id, 'CHANGE_USER_PASSWORD', 'User', id, null, null, req);

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Change Password Error:', error);
        res.status(500).json({ message: 'Error changing password', error: error.message });
    }
};

// Bulk User Operations
exports.bulkUpdateUsers = async (req, res) => {
    try {
        const { userIds, updates } = req.body; // updates: { role_id, is_active }

        if (!Array.isArray(userIds) || userIds.length === 0) {
            return res.status(400).json({ message: 'User IDs array is required' });
        }

        const result = await User.update(updates, {
            where: { id: userIds }
        });

        await auditService.log(req.user.id, 'BULK_UPDATE_USERS', 'User', null, null, { userIds, updates }, req);

        res.json({ message: `${result[0]} users updated successfully` });
    } catch (error) {
        console.error('Bulk Update Error:', error);
        res.status(500).json({ message: 'Error updating users', error: error.message });
    }
};

// Get User Activity Logs
exports.getUserActivityLogs = async (req, res) => {
    try {
        const { id } = req.params;
        const { UserActivityLog } = require('../models');

        const logs = await UserActivityLog.findAll({
            where: { user_id: id },
            order: [['created_at', 'DESC']],
            limit: 50
        });

        res.json(logs);
    } catch (error) {
        console.error('Get Activity Logs Error:', error);
        res.status(500).json({ message: 'Error fetching activity logs', error: error.message });
    }
};

module.exports = exports;
