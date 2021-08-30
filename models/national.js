'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class National extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      National.hasMany(models.User, {
        foreignKey: 'national_id'
      })
    }
  };
  National.init({
    name: {
      type: DataTypes.STRING
    },
    native: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    currency: {
      type: DataTypes.STRING
    },
    continent: {
      type: DataTypes.STRING
    },
    capital: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'National',
    tableName: 'nationals',
  });
  return National;
};