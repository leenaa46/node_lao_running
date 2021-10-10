'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('package_complete_rewards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      package_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'packages',
          key: 'id'
        },
      },
      winner_type: {
        type: Sequelize.ENUM('ຈາກ​ການ​ສຸ່ມສະ​ເພາະ​ຜູ້​ທີ່​ແລ່ນ​ຕາມ​ເປົ້າ​ໝາຍ', 'ຈາກ​ການ​ສຸ່ມຜູ້ໂຊກດີ'),
        allowNull: false
      },
      ranking: {
        type: Sequelize.ENUM('1st', '2nd', '3rd', 'random'),
        allowNull: false
      },
      prize: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('package_complete_rewards');
  }
};