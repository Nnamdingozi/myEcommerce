'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Adding constraints to the code column
    await queryInterface.changeColumn('Countries', 'code', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });

    // Adding constraints to the country_code column in Merchants table
    await queryInterface.changeColumn('Merchants', 'country_code', {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'Countries',
        key: 'code'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // Establishing association between Merchant and Country
    await queryInterface.addConstraint('Merchants', {
      fields: ['country_code'],
      type: 'foreign key',
      name: 'fk_merchant_country_code',
      references: {
        table: 'Countries',
        field: 'code'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Reverting the code column constraints
    await queryInterface.changeColumn('Countries', 'code', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: false
    });

    // Reverting the country_code column constraints in Merchants table
    await queryInterface.changeColumn('Merchants', 'country_code', {
      type: Sequelize.STRING,
      allowNull: true,
      references: null,
      onDelete: null,
      onUpdate: null,
    });

    // Removing the association constraint
    await queryInterface.removeConstraint('Merchants', 'fk_merchant_country_code');
  }
};
