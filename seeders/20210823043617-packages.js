'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('packages', [{
        name: 'Starter',
        range: 10,
        price: 2,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae labore ducimus minima ea recusandae fugit aspernatur quaerat commodi nobis atque.'
      },
      {
        name: 'Pro',
        range: 42,
        price: 3,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae labore ducimus minima ea recusandae fugit aspernatur quaerat commodi nobis atque.'
      },
      {
        name: 'Premium',
        range: 100,
        price: 4,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae labore ducimus minima ea recusandae fugit aspernatur quaerat commodi nobis atque.'
      }, {
        name: 'Ultimate',
        range: 200,
        price: 5,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae labore ducimus minima ea recusandae fugit aspernatur quaerat commodi nobis atque.'
      }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('packages', null, {});

  }
};