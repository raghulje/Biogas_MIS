 'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class EmailLog extends Model {
        static associate(models) { }
    }
    EmailLog.init({
        recipient: DataTypes.STRING,
        subject: DataTypes.STRING,
        status: DataTypes.STRING,
        error_message: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'EmailLog',
        tableName: 'email_logs',
        underscored: true
    });
    return EmailLog;
};

