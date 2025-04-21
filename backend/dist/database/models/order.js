// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Order extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       Order.belongsTo(models.User, {
//         foreignKey: 'user_id',
//         as: 'userorders',
//         onDelete: 'CASCADE',
//         onUpdate: 'CASCADE'
//       });
//       Order.hasMany(models.OrderItem, {
//         foreignKey: 'order_id',
//         as: 'order',
//         onDelete: 'CASCADE',
//         onUpdate: 'CASCADE'
//       });
//     }
//   }
//   Order.init({
//     id: {
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//       type: DataTypes.INTEGER
//     },
//     user_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: 'users',
//         key: 'id'
//       }
//     },
//     status: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     order_date: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: DataTypes.NOW
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
//     total_amount: {
//       type: DataTypes.DECIMAL,
//       allowNull: false,
//       defaultValue: 0
//     },
//     payment_status: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       defaultValue: 'unpaid'
//     },
//     payment_method: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     shipping_address: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     shipping_method: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     tracking_number: {
//       type:DataTypes.STRING,
//       allowNull: true,
//     },
//     currency: {
//       type: DataTypes.STRING,
//         allowNull: false,
//         defaultValue: 'NGN'
//     },
//     transaction_reference: {
//       type: DataTypes.STRING,
//         allowNull: true,
//     }
//   }, {
//     sequelize,
//     modelName: 'Order',
//     tableName: 'orders'
//   });
//   return Order;
// };
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
exports.initOrderModel = initOrderModel;
const sequelize_1 = require("sequelize");
// Define attributes that are optional when creating a new Order record
// export interface OrderCreationAttributes
//   extends Optional<OrderAttributes, 'id' | 'createdAt' | 'updatedAt' | 'payment_method' | 'shipping_method' | 'tracking_number' | 'transaction_reference'> {}
class Order extends sequelize_1.Model {
    id;
    user_id;
    status;
    order_date;
    createdAt;
    updatedAt;
    total_amount;
    payment_status;
    payment_method;
    shipping_address;
    shipping_method;
    tracking_number;
    currency;
    transaction_reference;
    // Define associations with proper typing
    static associations;
    // Define model associations
    static associate(models) {
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
exports.Order = Order;
// Initialize the Order model
function initOrderModel(sequelize) {
    Order.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.INTEGER
        },
        user_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        status: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        order_date: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW
        },
        total_amount: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false,
            defaultValue: 0
        },
        payment_status: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            defaultValue: 'unpaid'
        },
        payment_method: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        shipping_address: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        shipping_method: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        tracking_number: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        currency: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            defaultValue: 'NGN'
        },
        transaction_reference: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
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
        modelName: 'Order',
        tableName: 'orders'
    });
    return Order;
}
exports.default = Order;
