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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItem = void 0;
exports.initOrderItemModel = initOrderItemModel;
const sequelize_1 = require("sequelize");
class OrderItem extends sequelize_1.Model {
    id;
    order_id;
    product_id;
    quantity;
    createdAt;
    updatedAt;
    // Define associations with proper typing
    static associations;
    // Define model associations
    static associate(models) {
        OrderItem.belongsTo(models.Order, {
            foreignKey: 'order_id',
            as: 'order',
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
exports.OrderItem = OrderItem;
// Initialize the OrderItem model
function initOrderItemModel(sequelize) {
    OrderItem.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.INTEGER
        },
        order_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'orders',
                key: 'id'
            }
        },
        product_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'products',
                key: 'id'
            }
        },
        quantity: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            validate: {
                min: 1
            }
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
        }
    }, {
        sequelize,
        modelName: 'OrderItem',
        tableName: 'orderItems'
    });
    return OrderItem;
}
exports.default = OrderItem;
