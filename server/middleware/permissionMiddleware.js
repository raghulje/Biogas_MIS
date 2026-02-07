const { Role, Permission, User } = require('../models');

/**
 * Permission check uses user-level permissions (user_permissions) as primary.
 * Admin/SuperAdmin role still gets full access. All others are checked against
 * the permissions assigned to that user in Create/Edit User.
 */
const permissionMiddleware = (resource, action) => {
    return async (req, res, next) => {
        try {
            const userId = req.user && req.user.id;
            if (!userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            let user = null;
            try {
                user = await User.findByPk(userId, {
                include: [
                        { model: Role, as: 'role', include: [{ model: Permission, as: 'permissions', through: { attributes: [] }, attributes: ['id', 'resource', 'action'] }] },
                        { model: Permission, as: 'permissions', through: { attributes: [] }, attributes: ['id', 'resource', 'action'] }
                        ]
                });
            } catch (queryErr) {
                console.error('Permission Middleware: user load failed, trying role-only', queryErr.message);
                try {
                    user = await User.findByPk(userId, {
                        include: [{ model: Role, as: 'role', include: [{ model: Permission, as: 'permissions', through: { attributes: [] }, attributes: ['id', 'resource', 'action'] }] }]
            });
                } catch (e2) {
                    console.error('Permission Middleware Error:', e2);
                    return res.status(500).json({ message: 'Server Error' });
                }
            }

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Admin/SuperAdmin: full access
            if (user.role && (user.role.name === 'Admin' || user.role.name === 'SuperAdmin')) {
                return next();
            }

            // User-level permissions (primary); fallback to role permissions if user has none set
            const perms = (user.permissions && user.permissions.length > 0)
                ? user.permissions
                : (user.role && user.role.permissions) || [];
            const hasPermission = perms.some(
                perm => perm && perm.resource === resource && (perm.action === action || perm.action === '*')
            );

            if (hasPermission) {
                next();
            } else {
                res.status(403).json({ message: 'Access Denied: Insufficient Permissions' });
            }
        } catch (error) {
            console.error('Permission Middleware Error:', error);
            res.status(500).json({ message: 'Server Error' });
        }
    };
};

module.exports = permissionMiddleware;
