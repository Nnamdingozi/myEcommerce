"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const cartController_1 = require("../controllers/cartController");
const cartRouter = express_1.default.Router();
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
cartRouter.post('/', authMiddleware_1.authenticate, cartController_1.addItemsHandler);
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
cartRouter.get('/:id', authMiddleware_1.authenticate, cartController_1.getCartItemByIdHandler);
cartRouter.get('/', authMiddleware_1.authenticate, cartController_1.getItemsByUserIdHandler);
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
cartRouter.put('/:id', authMiddleware_1.authenticate, cartController_1.updateCartItemsHandler);
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
cartRouter.delete('/:cartItemId', authMiddleware_1.authenticate, cartController_1.deleteCartItemHandler);
exports.default = cartRouter;
