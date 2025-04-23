"use strict";
// import dotenv from 'dotenv';
// import { Dialect } from 'sequelize';
// dotenv.config();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// export interface DBConfig {
//   username?: string;
//   password?: string | null;
//   database?: string;
//   host?: string;
//   dialect?: Dialect;
//   url?: string;
// }
// type Env = 'development' | 'swagger-autogen' | 'production';
// type Config = Record<Env, DBConfig>;
// const config: Config = {
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
//     dialect: 'postgres',
//     url: process.env.DATABASE_URL, // 👈 add this line
//   },
// };
// export default config;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
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
        use_env_variable: 'DATABASE_URL',
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
        logging: false,
    },
};
