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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Country = void 0;
exports.initCountryModel = initCountryModel;
const sequelize_1 = require("sequelize");
// Define the Country model class using TypeScript
class Country extends sequelize_1.Model {
    id;
    code;
    country_name;
    continent_name;
    createdAt;
    updatedAt;
    // Define associations for better type-checking and autocomplete support.
    // These will be set in the associate method.
    static associate(models) {
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
exports.Country = Country;
// Initialize the Country model
function initCountryModel(sequelize) {
    Country.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.INTEGER,
        },
        code: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        country_name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        continent_name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
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
        modelName: 'Country',
        tableName: 'countries',
    });
    return Country;
}
exports.default = Country;
