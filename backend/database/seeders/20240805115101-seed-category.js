'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if categories table already has data
    const existingCategories = await queryInterface.sequelize.query(
      `SELECT * FROM categories LIMIT 1;`
    );

    // Proceed with seeding only if no records are found
    if (existingCategories[0].length === 0) {
      await queryInterface.bulkInsert('categories', [
        {
          category_name: 'Electronics',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category_name: 'Resin Arts',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category_name: 'Clothings',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category_name: 'Shoes',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category_name: 'Wrist Watches',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category_name: 'Accessories',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category_name: 'Stationeries',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ], {});
    } else {
      console.log('Seed data already exists in "categories" table. Skipping seeding.');
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
    await queryInterface.sequelize.query('ALTER SEQUENCE "categories_id_seq" RESTART WITH 1;');
  }
};
