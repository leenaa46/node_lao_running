'use strict';
import {
  Model
} from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class Package extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Package.hasMany(models.UserPackage, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
        foreignKey: 'package_id'
      })
      Package.hasMany(models.PackageCompleteReward, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
        foreignKey: 'package_id'
      })
      Package.hasMany(models.PackageRegisterReward, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
        foreignKey: 'package_id'
      })
    }
  };

  Package.init({
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
    range: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Package',
    tableName: 'packages',
  });
  return Package;
};