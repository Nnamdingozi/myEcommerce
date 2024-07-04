'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Update the userId column to add constraints
    await queryInterface.changeColumn('Orders', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // This should match the table name in your database
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert the userId column constraints
    await queryInterface.changeColumn('Orders', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }
};
