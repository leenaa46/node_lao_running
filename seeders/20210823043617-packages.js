'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('packages', [{
      name: 'Starter',
      range: 15,
      price: 2,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae labore ducimus minima ea recusandae fugit aspernatur quaerat commodi nobis atque.',
      body: "ການຊ່ວຍເຫຼືອ ພາຫະນະນໍາສົ່ງຄົນເຈັບ ຈໍານວນ 7 ຄັນ ລວມເປັນມູນຄ່າ 31 ລ້ານ 5 ແສນ ເຢັນ (ຫລືປະມານ 3 ແສນ ໂດລາ) ແມ່ນ ຈະໄດ້ ຮີບດ່ວນ ແຈກຢາຍ ໃຫ້ບັນດາແຂວງທີ່ມີຄວາມຕ້ອງການ ຢ່າງຮີບດ່ວນ ເພື່ອໃຫ້ທັນຕໍ່ສະພາບການ ທີ່ພະຍາດ COVID-19 ກໍາລັງລະບາດ."
    },
    {
      name: 'Pro',
      range: 42,
      price: 3,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae labore ducimus minima ea recusandae fugit aspernatur quaerat commodi nobis atque.',
      body: "ການຊ່ວຍເຫຼືອ ພາຫະນະນໍາສົ່ງຄົນເຈັບ ຈໍານວນ 7 ຄັນ ລວມເປັນມູນຄ່າ 31 ລ້ານ 5 ແສນ ເຢັນ (ຫລືປະມານ 3 ແສນ ໂດລາ) ແມ່ນ ຈະໄດ້ ຮີບດ່ວນ ແຈກຢາຍ ໃຫ້ບັນດາແຂວງທີ່ມີຄວາມຕ້ອງການ ຢ່າງຮີບດ່ວນ ເພື່ອໃຫ້ທັນຕໍ່ສະພາບການ ທີ່ພະຍາດ COVID-19 ກໍາລັງລະບາດ."
    },
    {
      name: 'Premium',
      range: 100,
      price: 4,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae labore ducimus minima ea recusandae fugit aspernatur quaerat commodi nobis atque.',
      body: "ການຊ່ວຍເຫຼືອ ພາຫະນະນໍາສົ່ງຄົນເຈັບ ຈໍານວນ 7 ຄັນ ລວມເປັນມູນຄ່າ 31 ລ້ານ 5 ແສນ ເຢັນ (ຫລືປະມານ 3 ແສນ ໂດລາ) ແມ່ນ ຈະໄດ້ ຮີບດ່ວນ ແຈກຢາຍ ໃຫ້ບັນດາແຂວງທີ່ມີຄວາມຕ້ອງການ ຢ່າງຮີບດ່ວນ ເພື່ອໃຫ້ທັນຕໍ່ສະພາບການ ທີ່ພະຍາດ COVID-19 ກໍາລັງລະບາດ."
    }, {
      name: 'Ultimate',
      range: 200,
      price: 5,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae labore ducimus minima ea recusandae fugit aspernatur quaerat commodi nobis atque.',
      body: "ການຊ່ວຍເຫຼືອ ພາຫະນະນໍາສົ່ງຄົນເຈັບ ຈໍານວນ 7 ຄັນ ລວມເປັນມູນຄ່າ 31 ລ້ານ 5 ແສນ ເຢັນ (ຫລືປະມານ 3 ແສນ ໂດລາ) ແມ່ນ ຈະໄດ້ ຮີບດ່ວນ ແຈກຢາຍ ໃຫ້ບັນດາແຂວງທີ່ມີຄວາມຕ້ອງການ ຢ່າງຮີບດ່ວນ ເພື່ອໃຫ້ທັນຕໍ່ສະພາບການ ທີ່ພະຍາດ COVID-19 ກໍາລັງລະບາດ."
    }
    ], {})

    await queryInterface.bulkInsert('package_register_rewards', [
      {
        package_id: 1,
        value_la: 'ເສື້ອ​ແລ່ນ',
        value_en: 'Runner’s T-Shirt'
      },
      {
        package_id: 1,
        value_la: 'e-BIB',
        value_en: 'e-BIB'
      },
      {
        package_id: 2,
        value_la: 'ເສື້ອ​ແລ່ນ',
        value_en: 'Runner’s T-Shirt'
      },
      {
        package_id: 2,
        value_la: 'e-BIB',
        value_en: 'e-BIB'
      },
      {
        package_id: 3,
        value_la: 'ເສື້ອ​ແລ່ນ',
        value_en: 'Runner’s T-Shirt'
      },
      {
        package_id: 3,
        value_la: 'e-BIB',
        value_en: 'e-BIB'
      },
      {
        package_id: 4,
        value_la: 'ເສື້ອ​ແລ່ນ',
        value_en: 'Runner’s T-Shirt'
      },
      {
        package_id: 4,
        value_la: 'e-BIB',
        value_en: 'e-BIB'
      },
    ], {});

    await queryInterface.bulkInsert('package_complete_rewards', [
      // Pacakge 1
      {
        package_id: 1,
        winner_type_la: 'ໄດ້ທັນທີເມື່ອແລ່ນຄົບຕາມເປົ້າໝາຍ',
        winner_type_en: 'When complete the goal',
        ranking_la: 'ບໍ່ຈັດອັນດັບ',
        ranking_en: 'none',
        prize_la: 'E-certificate',
        prize_en: 'E-certificate'
      },
      {
        package_id: 1,
        winner_type_la: 'ຈາກ​ການ​ສຸ່ມສະ​ເພາະ​ຜູ້​ທີ່​ແລ່ນ​ຕາມ​ເປົ້າ​ໝາຍ',
        winner_type_en: 'From a lucky draw',
        ranking_la: 'ທີ 1',
        ranking_en: '1st',
        prize_la: 'ຕຸກ​ນ້ຳ, ກະ​ເປົາ​ຄາດ​ແອວ',
        prize_en: 'Eco water bottle, waist bag'
      },
      {
        package_id: 1,
        winner_type_la: 'ຈາກ​ການ​ສຸ່ມສະ​ເພາະ​ຜູ້​ທີ່​ແລ່ນ​ຕາມ​ເປົ້າ​ໝາຍ',
        winner_type_en: 'From a lucky draw',
        ranking_la: 'ທີ 2',
        ranking_en: '2nd',
        prize_la: 'ຕຸກ​ນ້ຳ, ກະ​ເປົາ​ຄາດ​ແອວ',
        prize_en: 'Eco water bottle, waist bag'
      },
      {
        package_id: 1,
        winner_type_la: 'ຈາກ​ການ​ສຸ່ມສະ​ເພາະ​ຜູ້​ທີ່​ແລ່ນ​ຕາມ​ເປົ້າ​ໝາຍ',
        winner_type_en: 'From a lucky draw',
        ranking_la: 'ທີ 3',
        ranking_en: '3rd',
        prize_la: 'ຕຸກ​ນ້ຳ',
        prize_en: 'Eco water bottle'
      },

      // package 2
      {
        package_id: 2,
        winner_type_la: 'ໄດ້ທັນທີເມື່ອແລ່ນຄົບຕາມເປົ້າໝາຍ',
        winner_type_en: 'When complete the goal',
        ranking_la: 'ບໍ່ຈັດອັນດັບ',
        ranking_en: 'none',
        prize_la: 'E-certificate',
        prize_en: 'E-certificate'
      },
      {
        package_id: 2,
        winner_type_la: 'ຈາກ​ການ​ສຸ່ມສະ​ເພາະ​ຜູ້​ທີ່​ແລ່ນ​ຕາມ​ເປົ້າ​ໝາຍ',
        winner_type_en: 'From a lucky draw',
        ranking_la: 'ທີ 1',
        ranking_en: '1st',
        prize_la: 'ຕຸກ​ນ້ຳ, ກະ​ເປົາ​ພາຍ, ຫູ​ຟັງ​ນ້ອຍ, ຂັນ',
        prize_en: 'Eco water bottle, bag, small headphone, trophy'
      },
      {
        package_id: 2,
        winner_type_la: 'ຈາກ​ການ​ສຸ່ມສະ​ເພາະ​ຜູ້​ທີ່​ແລ່ນ​ຕາມ​ເປົ້າ​ໝາຍ',
        winner_type_en: 'From a lucky draw',
        ranking_la: 'ທີ 2',
        ranking_en: '2nd',
        prize_la: 'ຕຸກ​ນ້ຳ, ກະ​ເປົາ​ພາຍ, ຫູ​ຟັງ​ນ້ອຍ',
        prize_en: 'Eco water bottle, bag, small headphone'
      },
      {
        package_id: 2,
        winner_type_la: 'ຈາກ​ການ​ສຸ່ມສະ​ເພາະ​ຜູ້​ທີ່​ແລ່ນ​ຕາມ​ເປົ້າ​ໝາຍ',
        winner_type_en: 'From a lucky draw',
        ranking_la: 'ທີ 3',
        ranking_en: '3rd',
        prize_la: 'ຕຸກ​ນ້ຳ, ຫູ​ຟັງ​ນ້ອຍ',
        prize_en: 'Eco water bottle, small headphone'
      },

      // package 3
      {
        package_id: 3,
        winner_type_la: 'ໄດ້ທັນທີເມື່ອແລ່ນຄົບຕາມເປົ້າໝາຍ',
        winner_type_en: 'When complete the goal',
        ranking_la: 'ບໍ່ຈັດອັນດັບ',
        ranking_en: 'none',
        prize_la: 'E-certificate',
        prize_en: 'E-certificate'
      },
      {
        package_id: 3,
        winner_type_la: 'ຈາກ​ການ​ສຸ່ມສະ​ເພາະ​ຜູ້​ທີ່​ແລ່ນ​ຕາມ​ເປົ້າ​ໝາຍ',
        winner_type_en: 'From a lucky draw',
        ranking_la: 'ທີ 1',
        ranking_en: '1st',
        prize_la: 'ຕຸກ​ນ້ຳ, ກະ​ເປົາ​ພາຍ, ຫູ​ຟັງ​ໃຫຍ່່, ​ໂມງ, ຂັນ',
        prize_en: 'Eco water bottle, bag, headphone, watch, trophy'
      },
      {
        package_id: 3,
        winner_type_la: 'ຈາກ​ການ​ສຸ່ມສະ​ເພາະ​ຜູ້​ທີ່​ແລ່ນ​ຕາມ​ເປົ້າ​ໝາຍ',
        winner_type_en: 'From a lucky draw',
        ranking_la: 'ທີ 2',
        ranking_en: '2nd',
        prize_la: 'ຕຸກ​ນ້ຳ, ກະ​ເປົາ​ພາຍ, ຫູ​ຟັງ​ໃຫຍ່່, ​ໂມງ',
        prize_en: 'Eco water bottle, bag, headphone, watch'
      },
      {
        package_id: 3,
        winner_type_la: 'ຈາກ​ການ​ສຸ່ມສະ​ເພາະ​ຜູ້​ທີ່​ແລ່ນ​ຕາມ​ເປົ້າ​ໝາຍ',
        winner_type_en: 'From a lucky draw',
        ranking_la: 'ທີ 3',
        ranking_en: '3rd',
        prize_la: 'ຕຸກ​ນ້ຳ, ຫູ​ຟັງ​ໃຫຍ່, ຂັນ',
        prize_en: 'Eco water bottle, headphone'
      },

      // package 4
      {
        package_id: 4,
        winner_type_la: 'ໄດ້ທັນທີເມື່ອແລ່ນຄົບຕາມເປົ້າໝາຍ',
        winner_type_en: 'When complete the goal',
        ranking_la: 'ບໍ່ຈັດອັນດັບ',
        ranking_en: 'none',
        prize_la: 'E-certificate',
        prize_en: 'E-certificate'
      },
      {
        package_id: 4,
        winner_type_la: 'ຈາກ​ການ​ສຸ່ມສະ​ເພາະ​ຜູ້​ທີ່​ແລ່ນ​ຕາມ​ເປົ້າ​ໝາຍ',
        winner_type_en: 'From a lucky draw',
        ranking_la: 'ທີ 1',
        ranking_en: '1st',
        prize_la: 'ຕຸກ​ນ້ຳ, smartwatch, ​ເກີບ​ແລ່ນ, ຂັນ',
        prize_en: 'Eco water bottle, smartwatch, trainers, trophy'
      },
      {
        package_id: 4,
        winner_type_la: 'ຈາກ​ການ​ສຸ່ມສະ​ເພາະ​ຜູ້​ທີ່​ແລ່ນ​ຕາມ​ເປົ້າ​ໝາຍ',
        winner_type_en: 'From a lucky draw',
        ranking_la: 'ທີ 2',
        ranking_en: '2nd',
        prize_la: 'ຕຸກ​ນ້ຳ, ຫູ​ຟັງ​ໃຫຍ່, smartwatch, ​​ເສື້ອ​ແຈັກ​ເກັດ, ຂັນ',
        prize_en: 'Eco water bottle, headphone, smartwatch, jacket, trophy'
      },
      {
        package_id: 4,
        winner_type_la: 'ຈາກ​ການ​ສຸ່ມສະ​ເພາະ​ຜູ້​ທີ່​ແລ່ນ​ຕາມ​ເປົ້າ​ໝາຍ',
        winner_type_en: 'From a lucky draw',
        ranking_la: 'ທີ 3',
        ranking_en: '3rd',
        prize_la: 'ຕຸກ​ນ້ຳ, ຫູ​ຟັງ​ນ້ອຍ, ​​ເສື້ອ​ແຈັກ​ເກັດ, ໂມງ, ຂັນ',
        prize_en: 'eco water bottle, small heaphone, watch, trophy'
      },

    ], {});

    await queryInterface.bulkInsert('package_images', [
      {
        package_id: 1,
        value: 'https://unsplash.com/photos/CVU_BwsEoJg',
      },
      {
        package_id: 1,
        value: 'https://images.unsplash.com/photo-1541983663620-7571a820610c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fHNwb3J0c3dlYXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      {
        package_id: 2,
        value: 'https://unsplash.com/photos/CVU_BwsEoJg',
      },
      {
        package_id: 2,
        value: 'https://images.unsplash.com/photo-1541983663620-7571a820610c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fHNwb3J0c3dlYXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      {
        package_id: 3,
        value: 'https://unsplash.com/photos/CVU_BwsEoJg',
      },
      {
        package_id: 3,
        value: 'https://images.unsplash.com/photo-1541983663620-7571a820610c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fHNwb3J0c3dlYXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      {
        package_id: 4,
        value: 'https://unsplash.com/photos/CVU_BwsEoJg',
      },
      {
        package_id: 4,
        value: 'https://images.unsplash.com/photo-1541983663620-7571a820610c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fHNwb3J0c3dlYXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
    ], {});
  },


  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('packages', null, {});

  }
};