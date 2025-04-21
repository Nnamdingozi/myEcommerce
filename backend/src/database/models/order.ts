
'use strict';

import {
  Model,
  DataTypes,
  Sequelize,
  Association
} from 'sequelize';
import User  from './user';
import OrderItem  from './orderitem';
import { OrderAttributes, OrderInput } from 'interface/OrderAttributes';


// Define attributes that are optional when creating a new Order record
export class Order extends Model<OrderAttributes, OrderInput> implements OrderAttributes {
  declare id: number;
  declare user_id: number;
  declare status: string;
  declare order_date: Date;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare total_amount: number;
  declare payment_status: string;
  declare payment_method?: string | null;
  declare shipping_address: string;
  declare shipping_method?: string | null;
  declare tracking_number?: string | null;
  declare currency: string;
  declare transaction_reference?: string | null;

  // Define associations with proper typing
  static associations: {
    userorders: Association<Order, User>;
    orderItems: Association<Order, OrderItem>;
  };

  // Define model associations
  static associate(models: { User: typeof User; OrderItem: typeof OrderItem }) {
    Order.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'userorders',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    Order.hasMany(models.OrderItem, {
      foreignKey: 'order_id',
      as: 'orderItems',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  }
}

// Initialize the Order model
export function initOrderModel(sequelize: Sequelize): typeof Order {
  Order.init(
    {
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
        allowNull: true
      },
      shipping_address: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      shipping_method: {
        type: DataTypes.STRING,
        allowNull: true
      },
      tracking_number: {
        type: DataTypes.STRING,
        allowNull: true
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'NGN'
      },
      transaction_reference: {
        type: DataTypes.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
    },
    {
      sequelize,
      modelName: 'Order',
      tableName: 'orders'
    }
  );

  return Order;
}
export const init = initOrderModel
export default Order;
