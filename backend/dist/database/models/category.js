'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.Category = void 0;
exports.initCategoryModel = initCategoryModel;
const sequelize_1 = require("sequelize");
class Category extends sequelize_1.Model {
    // Define associations with proper typing
    static associations;
    // Define model associations
    static associate(models) {
        Category.hasMany(models.Product, {
            foreignKey: 'category_id',
            as: 'category',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    }
}
exports.Category = Category;
// Initialize the Category model
function initCategoryModel(sequelize) {
    Category.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.INTEGER
        },
        category_name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
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
        modelName: 'Category',
        tableName: 'categories'
    });
    return Category;
}
exports.init = initCategoryModel;
exports.default = Category;
