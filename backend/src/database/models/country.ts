// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Country extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       Country.hasMany(models.User, {

//         foreignKey: 'country_code',
//         as: 'user',
//         sourceKey: 'code',
//         onDelete: 'CASCADE',
//         onUpdate: 'CASCADE'
//       });

//       Country.hasMany(models.Merchant, {

//         foreignKey: 'country_code',
//         sourceKey: 'code',
//         as: 'merchant',
//         onDelete: 'CASCADE',
//         onUpdate: 'CASCADE'
//       });
      
//     }
//   }
//   Country.init({
//     id: {
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//       type: DataTypes.INTEGER
//     },
//     code: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     country_name: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     continent_name: {
//       type: DataTypes.STRING
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
//     modelName: 'Country',
//     tableName: 'countries'
//   });
//   return Country;
// };


'use strict';

import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

// Define the attributes for the Country model
export interface CountryAttributes {
  id: number;
  code: string;
  country_name: string;
  continent_name?: string; // Optional field
  createdAt: Date;
  updatedAt: Date;
}

// Define the attributes that are optional when creating a new Country record
export interface CountryCreationAttributes
  extends Optional<CountryAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// Define the Country model class using TypeScript
export class Country
  extends Model<CountryAttributes, CountryCreationAttributes>
  implements CountryAttributes
{
  declare id: number;
  declare code: string;
  declare country_name: string;
  declare continent_name?: string;
  declare createdAt: Date;
  declare updatedAt: Date;

  // Define associations for better type-checking and autocomplete support.
  // These will be set in the associate method.
  static associate(models: { User: typeof import('./user').User;   Merchant: typeof import('./merchant').Merchant;  }) {
    // A Country has many Users
    Country.hasMany(models.User, {
      foreignKey: 'country_code',
      as: 'user',
      sourceKey: 'code',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // A Country has many Merchants
    Country.hasMany(models.Merchant, {
      foreignKey: 'country_code',
      sourceKey: 'code',
      as: 'merchant',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }
}

// Initialize the Country model
export function initCountryModel(sequelize: Sequelize): typeof Country {
  Country.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      country_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      continent_name: {
        type: DataTypes.STRING,
        allowNull: true,
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
      },
    },
    {
      sequelize,
      modelName: 'Country',
      tableName: 'countries',
    }
  );
  return Country;
}
export const init = initCountryModel;
export default Country;
