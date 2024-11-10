'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if products table already has data
    const existingProducts = await queryInterface.sequelize.query(
      `SELECT * FROM products LIMIT 1;`
    );

    // Proceed with seeding only if no records are found
    if (existingProducts[0].length === 0) {
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
          image_url: '/images/iphone.avif'
        },
        {
          name: '32 Inches television',
          merchant_id: 1,
          price: 123456.90,
          status: "in stock",
          category_id: 1,
          description: "Slik design with crystal clear picture quality",
          createdAt: new Date(),
          updatedAt: new Date(),
          image_url: '/images/tv.jpg'
        },
        {
          name: 'wall mirage',
          merchant_id: 1,
          price: 14700.90,
          status: "in stock",
          category_id: 2,
          description: "Beautifully crafted resin art",
          createdAt: new Date(),
          updatedAt: new Date(),
          image_url: '/images/resinart1.jpg'
        },
        {
          name: 'Resin Wall Art',
          merchant_id: 1,
          price: 14700.90,
          status: "in stock",
          category_id: 2,
          description: "Beautifully crafted resin art",
          createdAt: new Date(),
          updatedAt: new Date(),
          image_url: '/images/resinart2.jpg'
        },
        {
          name: 'Corporate Gown',
          merchant_id: 1,
          price: 7000.90,
          status: "in stock",
          category_id: 3,
          description: "Elegant Gown. Perfect for official assignments",
          createdAt: new Date(),
          updatedAt: new Date(),
          image_url: '/images/red-gown.jpg'
        },
        {
          name: 'Corporate Gown2',
          merchant_id: 1,
          price: 7000.90,
          status: "in stock",
          category_id: 3,
          description: "Corporate and stylish red gown",
          createdAt: new Date(),
          updatedAt: new Date(),
          image_url: '/images/redgown2.jpg'
        },
        {
          name: 'Fancy Pen',
          merchant_id: 1,
          price: 7000.90,
          status: "in stock",
          category_id: 4,
          description: "Inscribes flawlessly",
          createdAt: new Date(),
          updatedAt: new Date(),
          image_url: '/images/pencil.jpg'
        },
        {
          name: 'Sneakers',
          merchant_id: 1,
          price: 7500.90,
          status: "in stock",
          category_id: 7,
          description: "Blue breathable and lofty sneakers",
          createdAt: new Date(),
          updatedAt: new Date(),
          image_url: '/images/canvas.jpg'
        },
        {
          name: 'Ladies blink blink',
          merchant_id: 1,
          price: 750.90,
          status: "in stock",
          category_id: 5,
          description: "18 carat silver chain",
          createdAt: new Date(),
          updatedAt: new Date(),
          image_url: '/images/necklace.jpg'
        },
        {
          name: 'Mens belt',
          merchant_id: 1,
          price: 17000.90,
          status: "in stock",
          category_id: 6,
          description: "Brown leather glossy belt",
          createdAt: new Date(),
          updatedAt: new Date(),
          image_url: '/images/belt.avif'
        }
      ], {});
    } else {
      console.log('Seed data already exists in "products" table. Skipping seeding.');
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
    await queryInterface.sequelize.query('ALTER SEQUENCE "products_id_seq" RESTART WITH 1;');
  }
};
