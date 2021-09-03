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
        type: Sequelize.ENUM('pendding', 'success'),
        allowNull: false,
        defaultValue: 'pendding'
      },
      invoiceid: {
        type: Sequelize.UUID,
        defaultValue: 'invoice-' + Sequelize.UUIDV1,
        primaryKey: true
      },
      transactionid: {
        type: Sequelize.UUID,
        defaultValue: 'transaction-' + Sequelize.UUIDV1,
        primaryKey: true
      },
      terminalid: {
        type: Sequelize.UUID,
        defaultValue: 'terminalid-' + Sequelize.UUIDV1,
        primaryKey: true
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