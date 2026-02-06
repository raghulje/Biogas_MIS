'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Permission extends Model {
        static associate(models) {
            Permission.belongsToMany(models.Role, {
                through: 'RolePermission',
                foreignKey: 'permission_id',
                as: 'roles'
            });
        }
    }
    Permission.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            comment: 'e.g., mis_entry:create, report:view'
        },
        description: DataTypes.STRING,
        resource: {
            type: DataTypes.STRING,
            allowNull: false
        },
        action: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Permission',
        tableName: 'permissions',
        underscored: true
    });
    return Permission;
};
