'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if carts table already has data
    const existingCart = await queryInterface.sequelize.query(
      `SELECT * FROM carts WHERE user_id = 1 AND product_id = 6 LIMIT 1;`
    );

    // Proceed with seeding only if no matching record exists
    if (existingCart[0].length === 0) {
      await queryInterface.bulkInsert('carts', [{
        quantity: 2,
        user_id: 1,
        product_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    } else {
      console.log('Seed data already exists in "carts" table for user_id 1 and product_id 6. Skipping seeding.');
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('carts', null, {});
    await queryInterface.sequelize.query('ALTER SEQUENCE "carts_id_seq" RESTART WITH 1;');
  }
};
