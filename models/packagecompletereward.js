'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PackageCompleteReward extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PackageCompleteReward.belongsTo(models.Package, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
        foreignKey: 'package_id'
      })
    }
  };
  PackageCompleteReward.init({
    package_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'packages',
        key: 'id'
      },
    },
    winner_type: {
      type: DataTypes.ENUM('ຈາກ​ການ​ສຸ່ມສະ​ເພາະ​ຜູ້​ທີ່​ແລ່ນ​ຕາມ​ເປົ້າ​ໝາຍ', 'ຈາກ​ການ​ສຸ່ມຜູ້ໂຊກດີ'),
      allowNull: false
    },
    ranking: {
      type: DataTypes.ENUM('1st', '2nd', '3rd', 'random'),
      allowNull: false
    },
    prize: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'PackageCompleteReward',
    tableName: 'package_complete_rewards',
  });
  return PackageCompleteReward;
};