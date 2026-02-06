'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class EmailLog extends Model {
        static associate(models) { }
    }
    EmailLog.init({
        recipient: DataTypes.STRING,
        subject: DataTypes.STRING,
        status: {
            type: DataTypes.ENUM('sent', 'failed'),
            defaultValue: 'sent'
        },
        error_message: DataTypes.TEXT,
        sent_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        sequelize,
        modelName: 'EmailLog',
        tableName: 'email_logs',
        underscored: true,
        timestamps: false
    });
    return EmailLog;
};
