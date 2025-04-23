'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.Country = void 0;
exports.initCountryModel = initCountryModel;
const sequelize_1 = require("sequelize");
// Define the Country model class using TypeScript
class Country extends sequelize_1.Model {
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
exports.init = initCountryModel;
exports.default = Country;
