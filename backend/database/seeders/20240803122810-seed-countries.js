'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('countries', [
      {
        code: '+1',
        country_name: 'United States',
        continent_name: 'North America',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: '+10',
        country_name: 'Canada',
        continent_name: 'North America',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: '+44',
        country_name: 'United Kingdom',
        continent_name: 'Europe',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: '+61',
        country_name: 'Australia',
        continent_name: 'Australia',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: '+234',
        country_name: 'Nigeria',
        continent_name: 'Africa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: '+213',
        country_name: 'Algeria',
        continent_name: 'Africa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: '+91',
        country_name: 'India',
        continent_name: 'Asia',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: '+86',
        country_name: 'China',
        continent_name: 'Asia',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('countries', null, {});
    await queryInterface.sequelize.query('ALTER SEQUENCE "countries_id_seq" RESTART WITH 1;');
  }
 
};
