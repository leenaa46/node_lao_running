'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('nationals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      native: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      currency: {
        type: Sequelize.STRING
      },
      continent: {
        type: Sequelize.STRING
      },
      capital: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('nationals');
  }
};