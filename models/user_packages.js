'use strict';
import {
  Model
} from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class UserPackage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserPackage.belongsTo(models.User, {
        foreignKey: 'user_id'
      })

      UserPackage.belongsTo(models.Package, {
        foreignKey: 'package_id'
      })


    }
  };
  UserPackage.init({
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
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    status: {
      type: DataTypes.ENUM('pendding', 'success'),
      allowNull: false,
      defaultValue: 'pendding'
    },
    invoiceid: {
      type: DataTypes.UUID,
      defaultValue: 'invoice-' + DataTypes.UUIDV1,
      primaryKey: true
    },
    transactionid: {
      type: DataTypes.UUID,
      defaultValue: 'transaction-' + DataTypes.UUIDV1,
      primaryKey: true
    },
    terminalid: {
      type: DataTypes.UUID,
      defaultValue: 'terminalid-' + DataTypes.UUIDV1,
      primaryKey: true
    },
  }, {
    sequelize,
    modelName: 'UserPackage',
    tableName: 'user_packages',
  });
  return UserPackage;
};