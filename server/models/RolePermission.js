 'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class RolePermission extends Model {
        static associate(models) { }
    }
    RolePermission.init({
        role_id: DataTypes.INTEGER,
        permission_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'RolePermission',
        tableName: 'role_permissions',
        underscored: true
    });
    return RolePermission;
};

