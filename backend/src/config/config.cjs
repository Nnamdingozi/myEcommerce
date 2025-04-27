require('dotenv').config();

module.exports = {
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
