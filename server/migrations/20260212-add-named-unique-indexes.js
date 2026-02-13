'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Helper to ensure unique index with stable name, removing conflicting duplicates
    async function ensureUniqueIndex(table, columns, desiredName) {
      const indexes = await queryInterface.showIndex(table);
      // Remove other indexes covering same columns but different name
      for (const idx of indexes) {
        const cols = Array.isArray(idx.fields) ? idx.fields.map(f => (f.attribute || f.name || f.columnName || f)) : [];
        const colNames = cols.map(c => (typeof c === 'string' ? c : (c.attribute || c.name || c.columnName)));
        const sameCols = colNames.length === columns.length && columns.every(c => colNames.includes(c));
        if (sameCols && idx.name !== desiredName) {
          try {
            await queryInterface.removeIndex(table, idx.name);
            console.log(`Removed duplicate index ${idx.name} on ${table}`);
          } catch (e) {
            console.warn(`Failed to remove index ${idx.name} on ${table}:`, e.message || e);
          }
        }
      }
      // Add desired index if missing
      const exists = indexes.some(i => i.name === desiredName);
      if (!exists) {
        await queryInterface.addIndex(table, columns, { name: desiredName, unique: true });
        console.log(`Created index ${desiredName} on ${table}(${columns.join(',')})`);
      } else {
        console.log(`Index ${desiredName} already exists on ${table}`);
      }
    }

    await ensureUniqueIndex('users', ['email'], 'ux_users_email');
    await ensureUniqueIndex('permissions', ['name'], 'ux_permissions_name');
    await ensureUniqueIndex('roles', ['name'], 'ux_roles_name');
    await ensureUniqueIndex('email_templates', ['name'], 'ux_email_templates_name');
    await ensureUniqueIndex('password_reset_tokens', ['token'], 'ux_password_reset_tokens_token');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('users', 'ux_users_email');
    await queryInterface.removeIndex('permissions', 'ux_permissions_name');
    await queryInterface.removeIndex('roles', 'ux_roles_name');
    await queryInterface.removeIndex('email_templates', 'ux_email_templates_name');
    await queryInterface.removeIndex('password_reset_tokens', 'ux_password_reset_tokens_token');
  }
};

