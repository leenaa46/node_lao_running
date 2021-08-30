'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class national extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  national.init({
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
    modelName: 'national',
  });
  return national;
};