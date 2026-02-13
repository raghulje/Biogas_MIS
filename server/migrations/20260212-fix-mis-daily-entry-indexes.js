'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = 'mis_daily_entries';
    const desiredName = 'ux_mis_daily_entries_date_shift';

    // List existing indexes
    const indexes = await queryInterface.showIndex(table);

    // Find indexes that cover date+shift but have different name — remove duplicates
    for (const idx of indexes) {
      const cols = Array.isArray(idx.fields) ? idx.fields.map(f => (f.attribute || f.name || f.columnName || f)) : [];
      // Normalize column names
      const colNames = cols.map(c => (typeof c === 'string' ? c : (c.attribute || c.name || c.columnName)));
      if (colNames.length === 2 && colNames.includes('date') && colNames.includes('shift') && idx.name !== desiredName) {
        try {
          await queryInterface.removeIndex(table, idx.name);
          console.log(`Removed duplicate index ${idx.name} from ${table}`);
        } catch (e) {
          console.warn(`Failed to remove index ${idx.name}:`, e.message || e);
        }
      }
    }

    // Ensure the desired named unique index exists
    const exists = indexes.some(i => i.name === desiredName);
    if (!exists) {
      await queryInterface.addIndex(table, ['date', 'shift'], {
        name: desiredName,
        unique: true
      });
      console.log(`Created index ${desiredName} on ${table}(date,shift)`);
    } else {
      console.log(`Index ${desiredName} already exists on ${table}`);
    }
  },

  down: async (queryInterface, Sequelize) => {
    const table = 'mis_daily_entries';
    const desiredName = 'ux_mis_daily_entries_date_shift';
    await queryInterface.removeIndex(table, desiredName);
  }
};

