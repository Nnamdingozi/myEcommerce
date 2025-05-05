

import express, { Router} from 'express';
import { authenticate } from '../middlewares/authMiddleware';
import {
  addItemsHandler,
  getItemsByUserIdHandler,
  getCartItemByIdHandler,
  updateCartItemsHandler,
  deleteCartItemHandler,
} from '../controllers/cartController';

const cartRouter: Router = express.Router();

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add an item to the cart
 *     description: Adds a new item to the cart for a specified user. The request body should include the quantity, user ID, and product ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *               user_id:
 *                 type: string
 *               product_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Item successfully added to the cart
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
cartRouter.post('/', authenticate, addItemsHandler );

/**
 * @swagger
 * /cart/{id}:
 *   get:
 *     summary: Retrieve a cart item by ID
 *     description: Retrieves a specific cart item using the cart item's ID provided in the request parameters.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart item retrieved successfully
 *       404:
 *         description: Cart item not found
 *       500:
 *         description: Internal server error
 */
cartRouter.get('/:id', authenticate, getCartItemByIdHandler);

cartRouter.get('/', authenticate, getItemsByUserIdHandler );

/**
 * @swagger
 * /cart/{id}:
 *   put:
 *     summary: Update a cart item by ID
 *     description: Updates the quantity of an item in the cart using the cart item's ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cart item updated successfully
 *       404:
 *         description: Cart item not found
 *       500:
 *         description: Internal server error
 */
cartRouter.put('/:id', authenticate, updateCartItemsHandler);

/**
 * @swagger
 * /cart/{id}:
 *   delete:
 *     summary: Delete a cart item by ID
 *     description: Deletes a cart item from the cart using the item's ID from the path.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Cart item deleted successfully
 *       404:
 *         description: Cart item not found
 *       500:
 *         description: Internal server error
 */
cartRouter.delete('/:cartItemId', authenticate, deleteCartItemHandler);

export default cartRouter;
