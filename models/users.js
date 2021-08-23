'use strict';
import {
  Model
}
from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users.hasOne(models.user_profiles, {
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })

      users.hasMany(models.user_packages, {
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })

      users.hasMany(models.run_results, {
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    }
  };
  users.init({
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
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
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
    modelName: 'users',
  });
  return users;
};