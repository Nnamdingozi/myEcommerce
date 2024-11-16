const express = require('express');
const cartRoute = express.Router();
const passport = require('passport');
const {authenticate} = require('../middlewares/authMiddleware')

const { addItemsHandler,
   getItemByUserIdHandler,
    getCartItemsByIdHandler,
    updateCartItemsHandler,
    deleteCartItemHandler,
    } = require('../controllers/cartController');



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
 *                 description: The quantity of the product to add to the cart
 *                 example: 2
 *               user_id:
 *                 type: string
 *                 description: The ID of the user whose cart is being updated
 *                 example: "user123"
 *               product_id:
 *                 type: string
 *                 description: The ID of the product being added to the cart
 *                 example: "product123"
 *     responses:
 *       201:
 *         description: Item successfully added to the cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the cart item
 *                   example: "cartItem123"
 *                 quantity:
 *                   type: integer
 *                   description: The quantity of the product in the cart
 *                   example: 2
 *                 user_id:
 *                   type: string
 *                   description: The ID of the user
 *                   example: "user123"
 *                 product_id:
 *                   type: string
 *                   description: The ID of the product
 *                   example: "product123"
 *       400:
 *         description: Unable to add item to cart due to invalid input or other errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unable to add item to cart
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error message describing the issue
 */
    cartRoute.post('/',authenticate, addItemsHandler);

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
 *         description: The ID of the cart item to retrieve
 *         schema:
 *           type: string
 *           example: "cartItem123"
 *     responses:
 *       200:
 *         description: Cart item retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the cart item
 *                   example: "cartItem123"
 *                 quantity:
 *                   type: integer
 *                   description: The quantity of the product in the cart
 *                   example: 2
 *                 user_id:
 *                   type: string
 *                   description: The ID of the user who owns the cart
 *                   example: "user123"
 *                 product_id:
 *                   type: string
 *                   description: The ID of the product in the cart
 *                   example: "product123"
 *       404:
 *         description: Cart item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Cart item not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error message describing the issue
 */
    cartRoute.get('/:id',authenticate, getCartItemsByIdHandler);
    cartRoute.get('/', authenticate, getItemByUserIdHandler )
/**
 * @swagger
 * /cart/{id}:
 *   put:
 *     summary: Update a cart item by ID
 *     description: Updates the quantity of an item in the cart using the cart item's ID from the path and data from the request body.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the cart item to update
 *         schema:
 *           type: string
 *       - in: body
 *         name: cartItem
 *         description: The updated quantity for the cart item
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             quantity:
 *               type: integer
 *               description: The updated quantity of the item
 *               example: 3
 *     responses:
 *       200:
 *         description: Cart item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the cart item
 *                 quantity:
 *                   type: integer
 *                   description: The updated quantity of the item
 *       404:
 *         description: Cart item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Cart item not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error updating cart item
 */

    cartRoute.put('/:id', authenticate,  updateCartItemsHandler);
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
 *         description: The ID of the cart item to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Cart item deleted successfully
 *       404:
 *         description: Cart item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Cart item not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error deleting cart item
 */
    cartRoute.delete('/:cartItemId', authenticate,  deleteCartItemHandler);

    module.exports = cartRoute


