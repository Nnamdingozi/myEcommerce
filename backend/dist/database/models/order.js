'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.Order = void 0;
exports.initOrderModel = initOrderModel;
const sequelize_1 = require("sequelize");
// Define attributes that are optional when creating a new Order record
class Order extends sequelize_1.Model {
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
exports.init = initOrderModel;
exports.default = Order;
