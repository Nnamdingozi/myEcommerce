'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Update the country_code column to add constraints
    await queryInterface.changeColumn('Users', 'country_code', {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'Countries', // This should match the table name in your database
        key: 'code'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert the country_code column constraints
    await queryInterface.changeColumn('Users', 'country_code', {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'Countries',
        key: 'code'
      },
      onDelete: null,
      onUpdate: null
    });
  }
};
