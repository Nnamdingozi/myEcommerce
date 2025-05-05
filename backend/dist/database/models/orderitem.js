'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.OrderItem = void 0;
exports.initOrderItemModel = initOrderItemModel;
const sequelize_1 = require("sequelize");
class OrderItem extends sequelize_1.Model {
    // Define associations with proper typing
    static associations;
    // Define model associations
    static associate(models) {
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
exports.init = initOrderItemModel;
exports.default = OrderItem;
