// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class OrderItem extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here

//       // Association with Order model
//       OrderItem.belongsTo(models.Order, {
//         foreignKey: 'order_id',
//         as: 'order',
//         onDelete: 'CASCADE',
//         onUpdate: 'CASCADE'
//       });
//       // Association with Product model
//       OrderItem.belongsTo(models.Product, {
//         foreignKey: 'product_id',
//         as: 'product',
//         onDelete: 'CASCADE',
//         onUpdate: 'CASCADE'
//       });
//     }
//   }
//   OrderItem.init({
//     id: {
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//       type: DataTypes.INTEGER
//     },
//     order_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: 'orders',
//         key: 'id'
//       }
//     },
//     product_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: 'products',
//         key: 'id'
//       }
//     },
//     quantity: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       defaultValue: 1, // Default value if not provided
//       validate: {
//         min: 1 // Ensure quantity is at least 1
//       }
//     },
//     createdAt: {
//       allowNull: false,
//       type: DataTypes.DATE,
//       defaultValue: sequelize.NOW
//     },
//     updatedAt: {
//       allowNull: false,
//       type: DataTypes.DATE,
//       defaultValue: sequelize.NOW
//     },

//   }, {
//     sequelize,
//     modelName: 'OrderItem',
//     tableName: 'orderItems'
//   });
//   return OrderItem;
// };



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
