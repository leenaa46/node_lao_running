'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HalBranche extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      HalBranche.belongsTo(models.District, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
        foreignKey: 'district_id'
      })
      HalBranche.hasMany(models.UserProfile, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
        foreignKey: 'hal_branche_id'
      })
    }
  };
  HalBranche.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    tel: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    prefix: {
      type: DataTypes.STRING
    },
    lat: {
      type: DataTypes.STRING
    },
    lng: {
      type: DataTypes.STRING
    },
    district_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'districts',
        key: 'id'
      },
    },
  }, {
    sequelize,
    modelName: 'HalBranche',
    tableName: 'hal_branches',
  });
  return HalBranche;
};