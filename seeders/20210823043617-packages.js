'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('packages', [{
      name: 'Starter',
      price: 2,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae labore ducimus minima ea recusandae fugit aspernatur quaerat commodi nobis atque.',
      body: "ການຊ່ວຍເຫຼືອ ພາຫະນະນໍາສົ່ງຄົນເຈັບ ຈໍານວນ 7 ຄັນ ລວມເປັນມູນຄ່າ 31 ລ້ານ 5 ແສນ ເຢັນ (ຫລືປະມານ 3 ແສນ ໂດລາ) ແມ່ນ ຈະໄດ້ ຮບດ່ວນ ແຈກຢາຍ ໃຫ້ບັນດາແຂວງທີ່ມີຄວາມຕ້ອງການ ຢ່າງຮີບດ່ວນ ເພື່ອໃຫ້ທັນຕໍ່ສະພາບການ ທີ່ພະຍາດ COVID-19 ກໍາລັງລະບາດ.",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Pro',
      price: 3,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae labore ducimus minima ea recusandae fugit aspernatur quaerat commodi nobis atque.',
      body: "ການຊ່ວຍເຫຼືອ ພາຫະນະນໍາສົ່ງຄົນເຈັບ ຈໍານວນ 7 ຄັນ ລວມເປັນມູນຄ່າ 31 ລ້ານ 5 ແສນ ເຢັນ (ຫລືປະມານ 3 ແສນ ໂດລາ) ແມ່ນ ຈະໄດ້ ຮບດ່ວນ ແຈກຢາຍ ໃຫ້ບັນດາແຂວງທີ່ມີຄວາມຕ້ອງການ ຢ່າງຮີບດ່ວນ ເພື່ອໃຫ້ທັນຕໍ່ສະພາບການ ທີ່ພະຍາດ COVID-19 ກໍາລັງລະບາດ.",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ], {})
  },


  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('packages', null, {});

  }
};