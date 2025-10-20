
// src/routes/orderRouter.ts

import express, { Router } from 'express';
import { 
  createOrderHandler, 
  getAllOrdersHandler, 
  getOrderByIdHandler 
} from '../controllers/orderController';
import { authenticate } from '../middlewares/authMiddleware'; 

const orderRouter: Router = express.Router();

// All order routes require authentication
orderRouter.use(authenticate);
// Group routes for the base /api/orders endpoint
orderRouter.route('/')
  .post(createOrderHandler)
  .get(getAllOrdersHandler);

// Route for a specific order
orderRouter.route('/:orderId')
  .get(getOrderByIdHandler);

export default orderRouter;