'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_packages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
      },
      package_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'packages',
          key: 'id'
        },
      },
      total: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      status: {
        type: Sequelize.ENUM('pending', 'success'),
        allowNull: false,
        defaultValue: 'pending'
      },
      invoice_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      transaction_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      terminal_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ticket_id: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('user_packages');
  }
};