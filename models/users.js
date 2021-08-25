'use strict';
import {
  Model
}
from 'sequelize';
import Message from '../app/helpers/message.helper'

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.UserProfile, {
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }, {
        through: 'user_id'
      })

      User.hasMany(models.UserPackage, {
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })

      User.hasMany(models.RunResult, {
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    }
  };
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: Message.validation('is_email', 'users.email')
        },
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  });
  return User;
};