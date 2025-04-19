// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Category extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     Category.hasMany(models.Product, {
//         foreignKey: 'category_id',
//         as: 'category',
//         onDelete: 'CASCADE',
//         onUpdate: 'CASCADE'
//       });
//     }
//   }
//   Category.init({
//     id: {
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//       type: DataTypes.INTEGER,
//     },
//     category_name: {
//       type: DataTypes.STRING,
//       allowNull: false
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
//     }
//   }, {
//     sequelize,
//     modelName: 'Category',
//     tableName: 'categories'
//   });
//   return Category;
// };
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
exports.initCategoryModel = initCategoryModel;
const sequelize_1 = require("sequelize");
class Category extends sequelize_1.Model {
    id;
    category_name;
    createdAt;
    updatedAt;
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
exports.default = Category;
