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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
exports.initCartModel = initCartModel;
const sequelize_1 = require("sequelize");
// Define Cart model class
class Cart extends sequelize_1.Model {
    id;
    quantity;
    user_id;
    product_id;
    total;
    createdAt;
    updatedAt;
    // Define associations
    static associate(models) {
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
exports.Cart = Cart;
// Initialize Cart model
function initCartModel(sequelize) {
    Cart.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        quantity: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            validate: {
                min: 1,
            },
        },
        user_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        product_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'products',
                key: 'id',
            },
        },
        total: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false,
            defaultValue: 0,
        },
        createdAt: {
            allowNull: false,
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW
        },
        updatedAt: {
            allowNull: false,
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW
        },
    }, {
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
                    }));
                    if (product) {
                        cart.total = Number(product.price) * cart.quantity;
                        console.log(`Calculated Total: ${cart.total}`);
                    }
                    else {
                        throw new Error(`Product with id ${cart.product_id} not found`);
                    }
                }
                catch (err) {
                    console.error('Error in beforeCreate hook', err);
                }
            },
            // Before updating a cart, recalculate total price
            async beforeUpdate(cart, options) {
                console.log('Before Update Hook Triggered');
                try {
                    const product = (await sequelize.models.Product.findByPk(cart.product_id, {
                        transaction: options.transaction,
                    }));
                    if (product) {
                        cart.total = Number(product.price) * cart.quantity;
                        console.log(`Updated Total: ${cart.total}`);
                    }
                    else {
                        throw new Error(`Product with id ${cart.product_id} not found`);
                    }
                }
                catch (err) {
                    console.error('Error in beforeUpdate hook', err);
                }
            },
        },
    });
    return Cart;
}
exports.default = Cart;
