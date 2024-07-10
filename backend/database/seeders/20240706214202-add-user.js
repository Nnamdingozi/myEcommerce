'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Countries', [{
      code: '+234',
      country_name: 'Nigeria',
      continent_name: 'Africa',
      createdAt: new Date(),
      updatedAt: new Date()


    }])
    await queryInterface.bulkInsert('Users', [{
      username: 'joerald',
      email: 'zecample@gmail.com',
      phone: '+2348008000800',
      password: 'Secample!23d',
      country_code: '+234',
      createdAt: new Date(),
      updatedAt: new Date()

    }])
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
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
