'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class FinalMISReportConfig extends Model {
        static associate(models) { }
    }
    FinalMISReportConfig.init({
        // Comma-separated or JSON array of recipient emails
        to_emails: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: '[]'
        },
        subject: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: 'Final MIS Report'
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: 'Optional HTML body intro before the report table'
        },
        schedule_type: {
            type: DataTypes.ENUM('daily', 'weekly', 'monthly', 'quarterly', 'custom'),
            allowNull: false,
            defaultValue: 'monthly'
        },
        schedule_time: {
            type: DataTypes.STRING(10),
            allowNull: true,
            defaultValue: '09:00',
            comment: 'Time of day HH:MM (24h) for daily/weekly/monthly/quarterly'
        },
        cron_expression: {
            type: DataTypes.STRING(64),
            allowNull: true,
            comment: 'For schedule_type=custom, e.g. 0 9 * * 1 for Monday 9 AM'
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        last_sent_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'FinalMISReportConfig',
        tableName: 'final_mis_report_config',
        underscored: true
    });
    return FinalMISReportConfig;
};
