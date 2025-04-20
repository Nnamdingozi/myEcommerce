
'use strict';

import { Model, DataTypes, Sequelize, Optional, Association } from 'sequelize';

// Define attributes for the OrderItem model
export interface OrderItemAttributes {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

// Define attributes that are optional when creating a new OrderItem record
export interface OrderItemCreationAttributes
  extends Optional<OrderItemAttributes, 'id' | 'createdAt' | 'updatedAt'> { }

export class OrderItem
  extends Model<OrderItemAttributes, OrderItemCreationAttributes>
  implements OrderItemAttributes {
  declare id: number;
  declare order_id: number;
  declare product_id: number;
  declare quantity: number;
  declare createdAt: Date;
  declare updatedAt: Date;

  // Define associations with proper typing
  static associations: {
    order: Association<OrderItem, any>;
    product: Association<OrderItem, any>;
  };

  // Define model associations
  static associate(models: any) {
    OrderItem.belongsTo(models.Order, {
      foreignKey: 'order_id',
      as: 'orderItems',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    OrderItem.belongsTo(models.Product, {
      foreignKey: 'product_id',
      as: 'product',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  }
}

// Initialize the OrderItem model
export function initOrderItemModel(sequelize: Sequelize): typeof OrderItem {
  OrderItem.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'orders',
          key: 'id'
        }
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id'
        }
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
          min: 1
        }
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
      }
    },
    {
      sequelize,
      modelName: 'OrderItem',
      tableName: 'orderItems'
    }
  );

  return OrderItem;
}
export const init = initOrderItemModel
export default OrderItem;
