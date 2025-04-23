'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.Merchant = void 0;
exports.initMerchantModel = initMerchantModel;
const sequelize_1 = require("sequelize");
class Merchant extends sequelize_1.Model {
    // Define associations with proper typing
    static associations;
    // Define model associations
    static associate(models) {
        Merchant.belongsTo(models.Country, {
            foreignKey: 'country_code',
            targetKey: 'code',
            as: 'merchant',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        Merchant.hasMany(models.Product, {
            foreignKey: 'merchant_id',
            as: 'merchproducts',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    }
}
exports.Merchant = Merchant;
// Initialize the Merchant model
function initMerchantModel(sequelize) {
    Merchant.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.INTEGER
        },
        merchant_name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        country_code: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'countries',
                key: 'code'
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
        modelName: 'Merchant',
        tableName: 'merchants'
    });
    return Merchant;
}
exports.init = initMerchantModel;
exports.default = Merchant;
