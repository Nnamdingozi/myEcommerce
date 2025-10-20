import express from 'express';
import {
  upsertItemHandler,
  getUserCartHandler,
  deleteItemHandler,
  getSingleCartItemHandler,
  updateItemHandler
} from '../controllers/cartController';
import { authenticate } from '../middlewares/authMiddleware'; // Assuming you have auth middleware

const cartRouter = express.Router();
cartRouter.use(authenticate);

cartRouter.route('/')
.get(getUserCartHandler)
.post(upsertItemHandler);

// --- Routes for a specific item in the cart ---

cartRouter.route('/:id')
.get(getSingleCartItemHandler)
.put(updateItemHandler) 
.delete(deleteItemHandler);
export default cartRouter;