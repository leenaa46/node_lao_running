'use strict';
import {
  Model
} from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class user_packages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user_packages.belongsTo(models.users, {
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })

      user_packages.belongsTo(models.packages, {
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    }
  };
  user_packages.init({
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
    package_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'packages',
        key: 'id'
      },
    },
    payment_slip: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'rejected'),
      defaultValue: 'pending',
      allowNull: false
    },
    profile_image: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'user_packages',
  });
  return user_packages;
};