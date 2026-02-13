'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('notification_schedules', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      mis_start_time: { type: Sequelize.TIME, allowNull: false },
      mis_end_time: { type: Sequelize.TIME, allowNull: false },
      reminder_start_time: { type: Sequelize.TIME, allowNull: false },
      reminder_interval_minutes: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 60 },
      reminder_count: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 4 },
      is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('notification_schedules');
  }
};

