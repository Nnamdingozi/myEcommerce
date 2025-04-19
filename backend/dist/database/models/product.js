"use strict";
// 'use strict';
// const {
//   Model
// } = require('sequelize');
// const orderitem = require('./orderitem');
// module.exports = (sequelize, DataTypes) => {
//   class Product extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       Product.belongsTo(models.Merchant, {
//         foreignKey: 'merchant_id',
//         as: 'merchproducts',
//         onDelete: 'CASCADE',
//         onUpdate: 'CASCADE'
//       });
Object.defineProperty(exports, "__esModule", { value: true });
exports.initProductModel = initProductModel;
//       Product.belongsTo(models.Category, {
//         foreignKey: 'category_id',
//         as: 'category',
//         onDelete: 'CASCADE',
//         onUpdate: 'CASCADE'
//       });
//       Product.hasMany(models.OrderItem, {
//         foreignKey: 'product_id',
//         as: 'product',
//         onDelete: 'CASCADE',
//         onUpdate: 'CASCADE'
//       });
//       Product.hasMany(models.Cart, {
//         foreignKey: 'product_id',
//         as: 'cartproduct',
//         onDelete: 'CASCADE',
//         onUpdate: 'CASCADE'
//       });
//     }
//   }
//   Product.init({
//     id: {
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//       type: DataTypes.INTEGER
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     merchant_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: 'merchants',
//         key: 'id' 
//       }
//     },
//     price: {
//       type: DataTypes.DECIMAL,
//       allowNull: false
//     },
//   status: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//     category_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: 'categories',
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
//     description: {
//       type: DataTypes.TEXT,
//       allowNull: true
//     },
//     image_url: {
//       type: DataTypes.STRING,
//       allowNull: true
//     }
//   }, {
//     sequelize,
//     modelName: 'Product',
//     tableName: 'products'
//   });
//   return Product;
// };
const sequelize_1 = require("sequelize");
class Product extends sequelize_1.Model {
    id;
    name;
    merchant_id;
    price;
    status;
    category_id;
    createdAt;
    updatedAt;
    description;
    image_url;
    // Define associations
    static associations;
    // Define associations method
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
// Initialize Product Model
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
exports.default = Product;
