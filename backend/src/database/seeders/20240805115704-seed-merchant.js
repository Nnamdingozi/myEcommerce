'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if merchants table already has data
    const existingMerchants = await queryInterface.sequelize.query(
      `SELECT * FROM merchants LIMIT 1;`
    );

    // Proceed with seeding only if no records are found
    if (existingMerchants[0].length === 0) {
      await queryInterface.bulkInsert('merchants', [
        {
          merchant_name: 'Finias',
          email: 'finias@gmail.com',
          country_code: '+234',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
    } else {
      console.log('Seed data already exists in "merchants" table. Skipping seeding.');
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('merchants', null, {});
    await queryInterface.sequelize.query('ALTER SEQUENCE "merchants_id_seq" RESTART WITH 1;');
  }
};
