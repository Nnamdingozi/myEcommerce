'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('merchants', [{
       merchant_name: 'Finias',
        email: 'finias@gmail.com',
        country_code: '+234'
     }], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('merchants', null, {});
    await queryInterface.sequelize.query('ALTER SEQUENCE "merchants_id_seq" RESTART WITH 1;');
    
  }
};
