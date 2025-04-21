"use strict";
// const express = require('express');
// const swaggerJsdoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');
// const path = require('path');
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const app = express();
// // Swagger JSDoc configuration
// const swaggerOptions = {
//   definition: {
//       openapi: '3.0.0',
//       info: {
//           title: 'Ecommerce API',
//           description: 'Endpoints for interaction with myEcommerce project',
//           version: '1.0.0',
//       },
//       servers: [
//           {
//               url: process.env.API_BASE_URL || 'http://localhost:3000',
//           },
//       ],
//   },
//   apis: [path.resolve(__dirname, '../../routes/*.js')],
// };
// // Initialize swagger-jsdoc
// const swaggerSpec = swaggerJsdoc(swaggerOptions);
// // Serve Swagger documentation
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// // Example route
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });
// // Start the server
// app.listen(3000, () => {
//     console.log('Server running on http://localhost:3000');
//     console.log('Swagger documentation available at http://localhost:3000/api-docs');
// });
const express_1 = __importDefault(require("express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// Swagger JSDoc configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ecommerce API',
            description: 'Endpoints for interaction with myEcommerce project',
            version: '1.0.0',
        },
        servers: [
            {
                url: process.env.API_BASE_URL || 'http://localhost:3000',
            },
        ],
    },
    apis: [path_1.default.resolve(__dirname, '../../routes/*.ts')], // Use .ts files if they are written in TypeScript
};
// Initialize swagger-jsdoc
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
// Serve Swagger documentation
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
// Example route
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
    console.log('Swagger documentation available at http://localhost:3000/api-docs');
});
