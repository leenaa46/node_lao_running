'use strict';
import {
  Model
}
  from 'sequelize';
import Message from '../app/helpers/message.helper'

module.exports = (sequelize, DataTypes) => {
  class RoleUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RoleUser.belongsTo(models.User, {
        foreignKey: 'user_id'
      })
      RoleUser.belongsTo(models.Role, {
        foreignKey: 'role_id'
      })
    }
  };
  RoleUser.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id'
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      default: DataTypes.CURRENT_TIMESTAMP
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      default: DataTypes.CURRENT_TIMESTAMP
    },
  }, {
    sequelize,
    modelName: 'RoleUser',
    tableName: 'role_users',
  });
  return RoleUser;
};