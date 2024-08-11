'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('products', [{
       name: 'iPhone 15 pro max',
       merchant_id: 1,
       price: 123456.90,
       status: "in stock",
       category_id: 1,
       description: "Meet next Gen iphone product with cutting edge Technology",
       createdAt: new Date(),
       updatedAt: new Date(),
       image_url: null
      }], {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('products', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
