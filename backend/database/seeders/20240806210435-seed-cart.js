'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('carts', [{
        quantity: 2,
       user_id: 1,
       product_id: 6,
       createdAt: new Date(),
       updatedAt: new Date()

        }], {});

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('carts', null, {});
    await queryInterface.sequelize.query('ALTER SEQUENCE "carts_id_seq" RESTART WITH 1;');
    /**
     * 
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
