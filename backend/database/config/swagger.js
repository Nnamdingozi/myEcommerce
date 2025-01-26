const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const app = express();

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
  apis: [path.resolve(__dirname, '../../routes/*.js')],
};
// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Example route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
    console.log('Swagger documentation available at http://localhost:3000/api-docs');
});
