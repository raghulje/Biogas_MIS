'use strict';

module.exports = {
  up: async (queryInterface /*, Sequelize */) => {
    // Prefer using the connected sequelize instance or the library types
    const Seq = (queryInterface && queryInterface.sequelize && queryInterface.sequelize.constructor) ? queryInterface.sequelize.constructor : require('sequelize');
    await queryInterface.createTable('notification_schedules', {
      id: {
        type: Seq.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      mis_start_time: { type: Seq.TIME, allowNull: false },
      mis_end_time: { type: Seq.TIME, allowNull: false },
      reminder_start_time: { type: Seq.TIME, allowNull: false },
      reminder_interval_minutes: { type: Seq.INTEGER, allowNull: false, defaultValue: 60 },
      reminder_count: { type: Seq.INTEGER, allowNull: false, defaultValue: 4 },
      is_active: { type: Seq.BOOLEAN, allowNull: false, defaultValue: true },
      created_at: { type: Seq.DATE, allowNull: false, defaultValue: Seq.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Seq.DATE, allowNull: false, defaultValue: Seq.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
    });
  },
  down: async (queryInterface /*, Sequelize */) => {
    await queryInterface.dropTable('notification_schedules');
  }
};

