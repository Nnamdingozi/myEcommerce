'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('products', [
      {
       name: 'iPhone 15 pro max',
       merchant_id: 1,
       price: 123456.90,
       status: "in stock",
       category_id: 1,
       description: "Meet next Gen iphone product with cutting edge Technology",
       createdAt: new Date(),
       updatedAt: new Date(),
       image_url: null
      },
      {
        name: 'wall mirage',
        merchant_id: 1,
        price: 14700.90,
        status: "in stock",
        category_id: 2,
        description: "Meet next Gen iphone product with cutting edge Technology",
        createdAt: new Date(),
        updatedAt: new Date(),
        image_url: null
      },
      {
        name: 'Corporate Gown',
        merchant_id: 1,
        price: 7000.90,
        status: "in stock",
        category_id: 3,
        description: "Meet next Gen iphone product with cutting edge Technology",
        createdAt: new Date(),
        updatedAt: new Date(),
        image_url: null
      },
    {
      name: 'Wedge sandals',
        merchant_id: 1,
        price: 7000.90,
        status: "in stock",
        category_id: 4,
        description: "Meet next Gen iphone product with cutting edge Technology",
        createdAt: new Date(),
        updatedAt: new Date(),
        image_url: null
    },
    {
      name: 'fancy pen',
        merchant_id: 1,
        price: 7500.90,
        status: "in stock",
        category_id: 7,
        description: "Meet next Gen iphone product with cutting edge Technology",
        createdAt: new Date(),
        updatedAt: new Date(),
        image_url: null
    },
    {
      name: 'Ladies blink blink',
        merchant_id: 1,
        price: 750.90,
        status: "in stock",
        category_id: 5,
        description: "Meet next Gen iphone product with cutting edge Technology",
        createdAt: new Date(),
        updatedAt: new Date(),
        image_url: null
    },
    {
      name: 'Mens belt',
        merchant_id: 1,
        price: 17000.90,
        status: "in stock",
        category_id: 6,
        description: "Meet next Gen iphone product with cutting edge Technology",
        createdAt: new Date(),
        updatedAt: new Date(),
        image_url: null
    }
    ], {});
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
