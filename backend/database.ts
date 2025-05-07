// import { Sequelize } from 'sequelize';

// const dbUrl = process.env.DATABASE_URL;

// const sequelize = dbUrl
//   ? new Sequelize(dbUrl, {
//       dialect: 'postgres',
//       dialectOptions: {
//         ssl: { require: true, rejectUnauthorized: false },
//       },
//     })
//   : new Sequelize(
//       process.env.DB_DATABASE || 'mydb_dev',
//       process.env.DB_USERNAME || 'postgres',
//       process.env.DB_PASSWORD || '',
//       {
//         host: process.env.DB_HOST || '127.0.0.1',
//         dialect: 'postgres',
//       }
//     );

// export default sequelize;
