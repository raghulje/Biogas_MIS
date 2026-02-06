const { Role, Permission, User } = require('../models');

const permissionMiddleware = (resource, action) => {
    return async (req, res, next) => {
        try {
            const userId = req.user.id;
            const user = await User.findByPk(userId, {
                include: [
                    {
                        model: Role,
                        as: 'role',
                        include: [
                            {
                                model: Permission,
                                as: 'permissions'
                            }
                        ]
                    }
                ]
            });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Check if role is Admin (Full Access usually)
            if (user.role.name === 'Admin' || user.role.name === 'SuperAdmin') {
                return next();
            }

            const hasPermission = user.role.permissions.some(
                perm => perm.resource === resource && (perm.action === action || perm.action === '*')
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
