'use strict';

const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if the users table already contains data
    const existingUsers = await queryInterface.sequelize.query(
      `SELECT * FROM users WHERE username = 'joerald' AND email = 'example@gmail.com';`
    );

    // Proceed with seeding only if no matching user is found
    if (existingUsers[0].length === 0) {
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
    } else {
      console.log('Seed data already exists in "users" table. Skipping seeding.');
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.sequelize.query('ALTER SEQUENCE "users_id_seq" RESTART WITH 1;');
  }
};
