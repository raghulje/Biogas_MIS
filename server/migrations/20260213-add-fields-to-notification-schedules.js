'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Resolve Sequelize constructor for types (Umzug context may not pass Sequelize)
    const Seq = (Sequelize && Sequelize.STRING) ? Sequelize : (queryInterface && queryInterface.sequelize && queryInterface.sequelize.constructor) ? queryInterface.sequelize.constructor : require('sequelize');
    // Add name and target_role columns to support multiple schedules
    await (queryInterface && typeof queryInterface.addColumn === 'function' ? queryInterface : queryInterface.sequelize.getQueryInterface()).addColumn('notification_schedules', 'name', {
      type: Seq.STRING(100),
      allowNull: false,
      defaultValue: 'Reminder'
    });
    await (queryInterface && typeof queryInterface.addColumn === 'function' ? queryInterface : queryInterface.sequelize.getQueryInterface()).addColumn('notification_schedules', 'target_role', {
      type: Seq.STRING(50),
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
    const qi = (queryInterface && typeof queryInterface.removeColumn === 'function') ? queryInterface : (queryInterface && queryInterface.sequelize ? queryInterface.sequelize.getQueryInterface() : require('../models').sequelize.getQueryInterface());
    await qi.removeColumn('notification_schedules', 'target_role');
    await qi.removeColumn('notification_schedules', 'name');
  }
};

