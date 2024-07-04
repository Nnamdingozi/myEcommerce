'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('OrderItems', {
      fields: ['order_id'],
      type: 'foreign key',
      name: 'fk_orderitem_order', // optional, but recommended
      references: {
        table: 'Orders',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('OrderItems', {
      fields: ['product_id'],
      type: 'foreign key',
      name: 'fk_orderitem_product', // optional, but recommended
      references: {
        table: 'Products',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.changeColumn('OrderItems', 'order_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
    
    });
    await queryInterface.changeColumn('OrderItems', 'product_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
    
    });

    
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('OrderItems', 'fk_orderitem_order');
    await queryInterface.removeConstraint('OrderItems', 'fk_orderitem_product');
    await queryInterface.changeColumn('OrderItems', 'product_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.changeColumn('OrderItems', 'order_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  }
};
