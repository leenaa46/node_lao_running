'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('districts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      province_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'provinces',
          key: 'id'
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        default: Sequelize.CURRENT_TIMESTAMP
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        default: Sequelize.CURRENT_TIMESTAMP
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('districts');
  }
};