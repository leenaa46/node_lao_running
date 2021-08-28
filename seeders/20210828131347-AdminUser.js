'use strict';
const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      name: 'admin',
      email: 'admin@gmail.com',
      password: await bcrypt.hash('11111111', 10),
      is_active: true
    }, ], {
      returning: true
    }).then(user => {
      return queryInterface.bulkInsert('role_users', [{
        user_id: user,
        role_id: 1,
      }, ], {})
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('role_users', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};