'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_profiles', {
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
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      surname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      gender: {
        type: Sequelize.ENUM('male', 'female'),
        allowNull: false
      },
      dob: {
        type: Sequelize.DATE,
        allowNull: false
      },
      national_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'nationals',
          key: 'id'
        }
      },
      hal_branche_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'hal_branches',
          key: 'id'
        }
      },
      profile_image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profile_image_id: {
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
    await queryInterface.dropTable('user_profiles');
  }
};