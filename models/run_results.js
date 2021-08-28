'use strict';
import {
  Model
} from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class RunResult extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RunResult.belongsTo(models.User, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
        foreignKey: 'user_id'
      })

      RunResult.belongsTo(models.UserPackage, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
        foreignKey: 'user_id'
      })
    }
  };
  RunResult.init({
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
    time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    is_free_user: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'RunResult',
    tableName: 'run_results'
  });
  return RunResult;
};