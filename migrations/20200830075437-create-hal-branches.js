'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('hal_branches', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      tel: {
        type: Sequelize.STRING,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true
      },
      prefix: {
        type: Sequelize.STRING,
        allowNull: true
      },
      lat: {
        type: Sequelize.STRING,
        allowNull: true
      },
      lng: {
        type: Sequelize.STRING,
        allowNull: true
      },
      district_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'districts',
          key: 'id'
        },
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
    await queryInterface.dropTable('hal_branches');
  }
};