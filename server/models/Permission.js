 'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Permission extends Model {
        static associate(models) { }
    }
    Permission.init({
        name: { type: DataTypes.STRING, allowNull: false },
        resource: DataTypes.STRING,
        action: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Permission',
        tableName: 'permissions',
        underscored: true
    });
    return Permission;
};

