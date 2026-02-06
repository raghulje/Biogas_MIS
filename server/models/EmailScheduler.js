'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class EmailScheduler extends Model {
        static associate(models) { }
    }
    EmailScheduler.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cron_expression: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '0 9 * * *' // Daily at 9 AM
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        job_type: {
            type: DataTypes.ENUM('daily_reminder', 'status_check', 'report'),
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'EmailScheduler',
        tableName: 'email_schedulers',
        underscored: true
    });
    return EmailScheduler;
};
