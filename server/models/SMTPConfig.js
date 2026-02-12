 'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class SMTPConfig extends Model {
        static associate(models) { }
    }
    SMTPConfig.init({
        host: { type: DataTypes.STRING, allowNull: false },
        port: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 587 },
        secure: { type: DataTypes.BOOLEAN, defaultValue: false },
        auth_user: DataTypes.STRING,
        auth_pass: DataTypes.STRING,
        from_email: DataTypes.STRING,
        from_name: DataTypes.STRING,
        is_active: { type: DataTypes.BOOLEAN, defaultValue: false }
    }, {
        sequelize,
        modelName: 'SMTPConfig',
        tableName: 'smtp_configs',
        underscored: true
    });
    return SMTPConfig;
};

