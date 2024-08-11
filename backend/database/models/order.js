'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'userorders',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Order.hasMany(models.OrderItem, {
        foreignKey: 'order_id',
        as: 'order',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Order.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW

    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW
    },
    total_amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0
    },
    payment_status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'unpaid'
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    shipping_address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    shipping_method: {
      type: DataTypes.STRING,
      allowNull: true,

    },
    tracking_number: {
      type:DataTypes.STRING,
      allowNull: true,

    },
    currency: {
      type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'NGN'
    }

  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders'
  });
  return Order;
};