'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add foreign key constraints
    await queryInterface.addConstraint('Products', {
      fields: ['merchant_id'],
      type: 'foreign key',
      name: 'fk_products_merchant_id',
      references: {
        table: 'Merchants',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    
    await queryInterface.changeColumn('Products', 'merchant_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
    
    });

    // Additional foreign key constraints for other tables

    // Example: Adding a foreign key constraint for OrderItem
    
  },

  down: async (queryInterface, Sequelize) => {
    // Remove foreign key constraints (reverse of the 'up' method)
    await queryInterface.removeConstraint('Products', 'fk_products_merchant_id');
    await queryInterface.changeColumn('Products', 'merchant_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    // Remove other foreign key constraints as needed
  }
};
