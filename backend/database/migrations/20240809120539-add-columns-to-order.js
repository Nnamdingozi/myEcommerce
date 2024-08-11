'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {

      await queryInterface.addColumn(
        'orders',
        'total_amount',
        {
          type: Sequelize.DECIMAL,
          allowNull: false,
          defaultValue: 0
        },
        { transaction }
      );

      await queryInterface.addColumn(
        'orders',
        'payment_status',
        {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'unpaid'
        },
        { transaction }
      );

      await queryInterface.addColumn(
        'orders',
        'payment_method',
        {
          type: Sequelize.STRING,
          allowNull: true,

        },
        { transaction }
      );

      await queryInterface.addColumn(
        'orders',
        'shipping_address',
        {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        { transaction }
      );

      await queryInterface.addColumn(
        'orders',
        'shipping_method',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
        { transaction }
      );

      await queryInterface.addColumn(
        'orders',
        'tracking_number', {
        type: Sequelize.STRING,
        allowNull: true,
      },
        { transaction }
      );
      await queryInterface.addColumn(
        'orders',
        'currency', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'NGN'
      },
        { transaction }
      );


    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn('orders', 'total_amount', { transaction });
      await queryInterface.removeColumn('orders', 'payment_status', { transaction });
      await queryInterface.removeColumn('orders', 'payment_method', { transaction });
      await queryInterface.removeColumn('orders', 'shipping_address', { transaction });
      await queryInterface.removeColumn('orders', 'shipping_method', { transaction });
      await queryInterface.removeColumn('orders', 'tracking_number', { transaction });
      await queryInterface.removeColumn('orders', 'currency', { transaction });
    });

    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
