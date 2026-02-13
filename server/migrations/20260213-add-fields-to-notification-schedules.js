'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add name and target_role columns to support multiple schedules
    await queryInterface.addColumn('notification_schedules', 'name', {
      type: Sequelize.STRING(100),
      allowNull: false,
      defaultValue: 'Reminder'
    });
    await queryInterface.addColumn('notification_schedules', 'target_role', {
      type: Sequelize.STRING(50),
      allowNull: true,
      defaultValue: null
    });

    // Backfill existing rows with a friendly name if present
    try {
      await queryInterface.sequelize.query(
        "UPDATE notification_schedules SET name = 'Default Reminder' WHERE name = 'Reminder' OR name IS NULL"
      );
    } catch (e) {
      // ignore
      console.warn('Backfill notification_schedules name failed:', e.message || e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('notification_schedules', 'target_role');
    await queryInterface.removeColumn('notification_schedules', 'name');
  }
};

