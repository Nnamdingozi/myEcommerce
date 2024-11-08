require('dotenv').config()

module.exports = {
    development: {
              url: process.env.DEV_DATABASE_URL,
              dialect: 'postgres',

    },

    'swagger-autogen': {
        url: process.env.SWAGGER_AUTOGEN_DB_URL,
        dialect: 'postgres',
    }
    // test: {
    //     url: process.env.TEST_DATABASE_URL,
    //     dialect: 'postgres',
    // },
    // production: {
    //     url: process.env.DATABASE_URL,
    //     dialect: 'postgres',
    // },
}