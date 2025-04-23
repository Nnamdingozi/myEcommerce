"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
exports.initProductModel = initProductModel;
const sequelize_1 = require("sequelize");
class Product extends sequelize_1.Model {
    static associations;
    static associate(models) {
        Product.belongsTo(models.Merchant, {
            foreignKey: 'merchant_id',
            as: 'merchproducts',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
        Product.belongsTo(models.Category, {
            foreignKey: 'category_id',
            as: 'category',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
        Product.hasMany(models.OrderItem, {
            foreignKey: 'product_id',
            as: 'product',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
        Product.hasMany(models.Cart, {
            foreignKey: 'product_id',
            as: 'cartproduct',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
    }
}
function initProductModel(sequelize) {
    Product.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.INTEGER,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        merchant_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'merchants',
                key: 'id',
            },
        },
        price: {
            type: sequelize_1.DataTypes.DECIMAL,
            allowNull: false,
        },
        status: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        category_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'categories',
                key: 'id',
            },
        },
        description: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true,
        },
        image_url: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        createdAt: {
            allowNull: false,
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
        updatedAt: {
            allowNull: false,
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
    }, {
        sequelize,
        modelName: 'Product',
        tableName: 'products',
    });
    return Product;
}
exports.init = initProductModel;
exports.default = Product;
