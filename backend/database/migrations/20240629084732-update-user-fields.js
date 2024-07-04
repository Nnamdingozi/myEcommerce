'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'username', {
      type: Sequelize.STRING,
      allowNull: false, 
      unique: true
    });

    await queryInterface.changeColumn('Users', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    });

    await queryInterface.changeColumn('Users', 'phone', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: true,
        len: [10, 15],
        is: /^[0-9]+$/i
      }
    });
    
    
    await queryInterface.changeColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [8, 100],
        isComplex(value) {
          const complexityRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
          if (!complexityRegex.test(value)) {
            throw new Error('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
          }
        }
      }
    });

    await queryInterface.changeColumn('Users', 'githubId', {
      type: Sequelize.STRING,
      allowNull: true, 
      unique: true
    });

    await queryInterface.addColumn('Users', 'country_code', {
      type: Sequelize.STRING,
      allowNull: true,
        validate: {
          is: /^\+\d{1,4}$/ // Ensures the country code format starts with '+' and is followed by digits
        }

    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'email', {
      type: Sequelize.STRING,
      
    });
    
    await queryInterface.changeColumn('Users', 'username', {
      type: Sequelize.STRING,
      unique: true
  
    });

    await queryInterface.changeColumn('Users', 'phone', {
      type: Sequelize.BIGINT,
  
    });
    await queryInterface.changeColumn('Users', 'password', {
      type: Sequelize.STRING,
  
    });

    await queryInterface.changeColumn('Users', 'githubId', {
      type: Sequelize.STRING,
    });
  }
};
