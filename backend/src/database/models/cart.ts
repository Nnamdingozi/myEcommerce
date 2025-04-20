
'use strict';

import { Model, DataTypes, Optional, Sequelize, Transaction } from 'sequelize';
import { User } from './user'; 
import Product from './product'; 

// Define the attributes for the Cart model
interface CartAttributes {
  id: number;
  quantity: number;
  user_id: number;
  product_id: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

// Define attributes that are optional when creating a new Cart record
interface CartCreationAttributes extends Optional<CartAttributes, 'id' | 'quantity' | 'total' | 'createdAt' | 'updatedAt'> {}

// Define Cart model class
export class Cart extends Model<CartAttributes, CartCreationAttributes> implements CartAttributes {
  declare id: number;
  declare quantity: number;
  declare user_id: number;
  declare product_id: number;
  declare total: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  // Define associations
  static associate(models: { User: typeof User; Product: typeof Product }) {
    Cart.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'cart',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    Cart.belongsTo(models.Product, {
      foreignKey: 'product_id',
      as: 'cartproduct',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }
}

// Initialize Cart model
export function initCartModel(sequelize: Sequelize): typeof Cart {
  Cart.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
          min: 1,
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id',
        },
      },
      total: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
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
      modelName: 'Cart',
      tableName: 'carts',
      hooks: {
        // Before creating a cart, calculate total price
        async beforeCreate(cart, options) {
          
          try {
            const product = (await sequelize.models.Product.findByPk(cart.product_id, {
              transaction: options.transaction,
            })) as Product | null;

            if (product) {
              cart.total = Number(product.price) * cart.quantity;
        
            } else {
              throw new Error(`Product with id ${cart.product_id} not found`);
            }
          } catch (err) {
            console.error('Error in beforeCreate hook', err);
          }
        },

        // Before updating a cart, recalculate total price
        async beforeUpdate(cart, options) {
        
          try {
            const product = (await sequelize.models.Product.findByPk(cart.product_id, {
              transaction: options.transaction,
            })) as Product | null;

            if (product) {
              cart.total = Number(product.price) * cart.quantity;
      
            } else {
              throw new Error(`Product with id ${cart.product_id} not found`);
            }
          } catch (err) {
            console.error('Error in beforeUpdate hook', err);
          }
        },
      },
    }
  );

  return Cart;
}
export const init = initCartModel;

export default Cart