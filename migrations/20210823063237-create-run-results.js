'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('run_results', {
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
      range: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      time: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image_id: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('run_results');
  }
};