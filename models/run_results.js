'use strict';
import {
  Model
} from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class run_results extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      run_results.belongsTo(models.users, {
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })

      run_results.belongsTo(models.user_packages, {
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    }
  };
  run_results.init({
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
        model: {
          tableName: 'packages',
          schema: 'schema'
        },
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
    modelName: 'run_results',
  });
  return run_results;
};