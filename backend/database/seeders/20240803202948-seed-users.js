'use strict';

const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('Example1@pw', 10); // Hash the password

    await queryInterface.bulkInsert('users', [
      {
        username: 'joerald',
        email: 'example@gmail.com',
        phone: '090090090000',
        password: hashedPassword, // Use the hashed password
        githubId: null,
        country_code: '+234',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Add more users as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
