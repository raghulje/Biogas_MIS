const { AuditLog } = require('../models');

const auditService = {
    log: async (userId, action, resourceType, resourceId, oldValues, newValues, req) => {
        try {
            await AuditLog.create({
                user_id: userId,
                action,
                resource_type: resourceType,
                resource_id: resourceId ? String(resourceId) : null,
                old_values: oldValues,
                new_values: newValues,
                ip_address: req ? (req.ip || req.connection.remoteAddress) : null,
                user_agent: req ? req.get('User-Agent') : null
            });
        } catch (error) {
            console.error('Audit Log Error:', error);
        }
    }
};

module.exports = auditService;
