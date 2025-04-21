
import express, { Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

const app = express(); // Ensure you initialize the express app

// Swagger JSDoc configuration
const swaggerOptions: swaggerJsdoc.Options = {
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
  apis: [path.resolve(__dirname, '../../routes/*.ts')], // Point to TypeScript files
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Example route
app.get('/', (req: Request, res: Response): void => {
  res.send('Hello World!');
});

// Start the server
app.listen(3000, (): void => {
  console.log('Server running on http://localhost:3000');
  console.log('Swagger documentation available at http://localhost:3000/api-docs');
});
