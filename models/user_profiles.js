'use strict';
import {
  Model
} from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserProfile.belongsTo(models.User, {
        foreignKey: 'user_id'
      })
      UserProfile.belongsTo(models.HalBranche, {
        foreignKey: 'hal_branche_id'
      })
    }
  };
  UserProfile.init({
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
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.ENUM('male', 'female'),
      allowNull: false
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false
    },
    national_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'nationals',
        key: 'id'
      }
    },
    hal_branche_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'hal_branches',
        key: 'id'
      }
    },
    profile_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_image_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    identity_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    identity_image_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'UserProfile',
    tableName: 'user_profiles',
  });
  return UserProfile;
};