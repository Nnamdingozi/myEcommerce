"use strict";
// require('dotenv').config();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// module.exports = {
//     development: {
//         url: process.env.DEV_DATABASE_URL,
//         dialect: 'postgres',
//     },
//     'swagger-autogen': {
//         url: process.env.SWAGGER_AUTOGEN_DB_URL,
//         dialect: 'postgres',
//     },
//     // Uncomment to enable test configuration
//     // test: {
//     //     url: process.env.TEST_DATABASE_URL,
//     //     dialect: 'postgres',
//     // },
//     production: {
//         url: process.env.DATABASE_URL,
//         dialect: 'postgres',
//     },
// };
// import dotenv from 'dotenv';
// import { Dialect } from 'sequelize';
// dotenv.config();
// interface DBConfig {
//   url?: string;
//   dialect: Dialect;
// }
// interface Config {
//   development: DBConfig;
//   'swagger-autogen': DBConfig;
//   production: DBConfig;
// }
// const databaseConfig: Config = {
//   development: {
//     url: process.env.DEV_DATABASE_URL,
//     dialect: 'postgres',
//   },
//   'swagger-autogen': {
//     url: process.env.SWAGGER_AUTOGEN_DB_URL,
//     dialect: 'postgres',
//   },
//   production: {
//     url: process.env.DATABASE_URL,
//     dialect: 'postgres',
//   },
// };
// export default databaseConfig;
// import dotenv from 'dotenv';
// import { Dialect } from 'sequelize';
// dotenv.config();
// export interface DBConfig {
//   username: string;
//   password: string | null;
//   database: string;
//   host: string;
//   dialect: Dialect;
// }
// interface Config {
//   development: DBConfig;
//   'swagger-autogen': DBConfig;
//   production: DBConfig;
// }
// const databaseConfig: Config = {
//   development: {
//     username: process.env.DB_USERNAME || 'root',
//     password: process.env.DB_PASSWORD || null,
//     database: process.env.DB_DATABASE || 'database_development',
//     host: process.env.DB_HOST || '127.0.0.1',
//     dialect: 'postgres',
//   },
//   'swagger-autogen': {
//     username: process.env.SWAGGER_DB_USERNAME || 'root',
//     password: process.env.SWAGGER_DB_PASSWORD || null,
//     database: process.env.SWAGGER_DB_DATABASE || 'swagger_db',
//     host: process.env.SWAGGER_DB_HOST || '127.0.0.1',
//     dialect: 'postgres',
//   },
//   production: {
//     username: process.env.DB_USERNAME || 'root',
//     password: process.env.DB_PASSWORD || null,
//     database: process.env.DB_DATABASE || 'database_production',
//     host: process.env.DB_HOST || '127.0.0.1',
//     dialect: 'postgres',
//   },
// };
// export default databaseConfig;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    development: {
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || null,
        database: process.env.DB_DATABASE || 'database_development',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'postgres',
    },
    'swagger-autogen': {
        username: process.env.SWAGGER_DB_USERNAME || 'root',
        password: process.env.SWAGGER_DB_PASSWORD || null,
        database: process.env.SWAGGER_DB_DATABASE || 'swagger_db',
        host: process.env.SWAGGER_DB_HOST || '127.0.0.1',
        dialect: 'postgres',
    },
    production: {
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || null,
        database: process.env.DB_DATABASE || 'database_production',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'postgres',
    },
};
exports.default = config;
