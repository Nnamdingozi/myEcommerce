"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../../config/config"));
const basename = path_1.default.basename(__filename);
const env = process.env.NODE_ENV || 'development';
let sequelize;
if (env === 'production' && process.env.DATABASE_URL) {
    sequelize = new sequelize_1.Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        logging: false,
    });
}
else {
    const config = config_1.default[env];
    if (!config.database || !config.username || !config.host) {
        throw new Error(`❌ Missing database configuration for env: ${env}`);
    }
    sequelize = new sequelize_1.Sequelize(config.database, config.username, config.password ?? undefined, {
        host: config.host,
        dialect: config.dialect,
        logging: false,
    });
}
const db = {};
const modelFiles = fs_1.default
    .readdirSync(__dirname)
    .filter((file) => {
    return (file !== basename &&
        !file.endsWith('.d.ts') &&
        (file.endsWith('.ts') || file.endsWith('.js')));
});
console.log('Model files found:', modelFiles);
modelFiles.forEach((file) => {
    const modelModule = require(path_1.default.join(__dirname, file));
    const initModel = modelModule.init;
    if (typeof initModel === 'function') {
        const model = initModel(sequelize);
        db[model.name] = model;
    }
    else {
        console.warn(`⚠️ Skipping ${file}: no init() function found`);
    }
});
Object.values(db).forEach((model) => {
    if (typeof model.associate === 'function') {
        model.associate(db);
        console.log(`🔗 Associated model: ${model.name}`);
    }
});
db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
exports.default = db;
