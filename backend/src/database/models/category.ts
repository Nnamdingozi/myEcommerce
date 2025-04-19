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

import {
  Model,
  DataTypes,
  Sequelize,
  Optional,
  Association
} from 'sequelize';
import  Product  from './product';

// Define attributes for the Category model
export interface CategoryAttributes {
  id: number;
  category_name: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define attributes that are optional when creating a new Category record
export interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
  declare id: number;
  declare category_name: string;
  declare createdAt: Date;
  declare updatedAt: Date;

  // Define associations with proper typing
  static associations: {
    category: Association<Category, Product>;
  };

  // Define model associations
  static associate(models: { Product: typeof Product }) {
    Category.hasMany(models.Product, {
      foreignKey: 'category_id',
      as: 'category',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  }
}

// Initialize the Category model
export function initCategoryModel(sequelize: Sequelize): typeof Category {
  Category.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      category_name: {
        type: DataTypes.STRING,
        allowNull: false
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
      }
    },
    {
      sequelize,
      modelName: 'Category',
      tableName: 'categories'
    }
  );

  return Category;
}
export const init = initCategoryModel;
export default Category;
