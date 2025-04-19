// 'use strict';


// const { Model, DataTypes } = require('sequelize');

// module.exports = (sequelize) => {
//   class Cart extends Model {
//     static associate(models) {
//       // define association here
//       Cart.belongsTo(models.User, {

//         foreignKey: 'user_id',
//         as: 'cart',
//         onDelete: 'CASCADE',
//         onUpdate: 'CASCADE'
//       });

//       Cart.belongsTo(models.Product, {
//         foreignKey: 'product_id',
//         as: 'cartproduct',
//         onDelete: 'CASCADE',
//         onUpdate: 'CASCADE'
//       });


//     }
//   }

//   Cart.init({
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     quantity: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       defaultValue: 1, // Default value if not provided
//       validate: {
//         min: 1 // Ensure quantity is at least 1
//       }
//     },



//     user_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: 'users',
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
//     total: {
//       type: DataTypes.DECIMAL,
//       allowNull: false,
//       defaultValue: 0

//     }
//   }, {
//     sequelize,
//     modelName: 'Cart',
//     tableName: 'carts',
//     hooks: {

//       //calculates total before creating a cart item
//       async beforeCreate(cart, options) {
//         console.log('Before Create Hook Triggered');
//         try {
//           const product = await sequelize.models.Product.findByPk(cart.product_id, { transaction: options.transaction });
//           if (product) {
//             cart.total = product.price * cart.quantity;
//             console.log(`Calculated Total: ${cart.total}`);
//           } else {
//             throw new Error(`Product with id ${cart.product_id} not found`)
//           }
//         } catch (err) {
//           console.error('Error in beforeCreate hook', err)
//         }
//       }
//       ,

//       async beforeUpdate(cart, options) {
//         console.log('Before update Hook Triggered');
//         try {
//           const product = await sequelize.models.Product.findByPk(cart.product_id, { transaction: options.transaction });

//           if (product) {
//             cart.total = product.price * cart.quantity;
//             console.log(`updated Total: ${cart.total}`);
//           } else {
//             throw new Error(`Product with id ${cart.product_id} not found`)
//           }
//         } catch (err) {
//           console.error('Error in beforeCreate hook', err);
//         }


//       }

//     }


//     //calculates total before updating a cart item

//   });

//   return Cart;
// };







'use strict';

import { Model, DataTypes, Optional, Sequelize, Transaction } from 'sequelize';
import { User } from './user'; // Import User model
import Product from './product'; // Import Product model

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
          console.log('Before Create Hook Triggered');
          try {
            const product = (await sequelize.models.Product.findByPk(cart.product_id, {
              transaction: options.transaction,
            })) as Product | null;

            if (product) {
              cart.total = Number(product.price) * cart.quantity;
              console.log(`Calculated Total: ${cart.total}`);
            } else {
              throw new Error(`Product with id ${cart.product_id} not found`);
            }
          } catch (err) {
            console.error('Error in beforeCreate hook', err);
          }
        },

        // Before updating a cart, recalculate total price
        async beforeUpdate(cart, options) {
          console.log('Before Update Hook Triggered');
          try {
            const product = (await sequelize.models.Product.findByPk(cart.product_id, {
              transaction: options.transaction,
            })) as Product | null;

            if (product) {
              cart.total = Number(product.price) * cart.quantity;
              console.log(`Updated Total: ${cart.total}`);
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