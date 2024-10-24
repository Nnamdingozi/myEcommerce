'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
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
        category_name: 'clothings',
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
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
    await queryInterface.sequelize.query('ALTER SEQUENCE "categories_id_seq" RESTART WITH 1;');
  }
};
