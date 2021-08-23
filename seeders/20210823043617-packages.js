'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Packages', [{
        name: 'Free',
        range: 0,
        price: 0,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae labore ducimus minima ea recusandae fugit aspernatur quaerat commodi nobis atque.'
      },
      {
        name: 'Starter',
        range: 100,
        price: 99000,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae labore ducimus minima ea recusandae fugit aspernatur quaerat commodi nobis atque.'
      },
      {
        name: 'Pro',
        range: 300,
        price: 199000,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae labore ducimus minima ea recusandae fugit aspernatur quaerat commodi nobis atque.'
      },
      {
        name: 'Premium',
        range: 500,
        price: 499000,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae labore ducimus minima ea recusandae fugit aspernatur quaerat commodi nobis atque.'
      }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Packages', null, {});

  }
};