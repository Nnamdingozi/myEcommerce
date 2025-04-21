
import express from 'express';
import {
    createProductHandler,
    getAllProductsHandler,
    getProductByIdHandler,
    getAllCategoriesHandler,
    getProductByCategoryIdHandler,
    updateProductHandler,
    deleteProductHandler
} from "../controllers/productController";

const productRouter = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve all products
 *     description: Retrieves a list of all products available in the database.
 *     responses:
 *       200:
 *         description: A list of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   merchant_id: 
 *                     type: integer
 *                   price:
 *                     type: float
 *                   status:
 *                     type: string
 *                   category_id:
 *                     type: integer
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                   description:
 *                     type: text
 *                   image_url:
 *                     type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
productRouter.post('/', createProductHandler);
productRouter.get('/', getAllProductsHandler);
productRouter.get('/categories', getAllCategoriesHandler);
productRouter.get('/categoryProduct/:id', getProductByCategoryIdHandler);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Retrieve a product by ID
 *     description: Fetches a single product from the database by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 merchant_id:
 *                   type: integer
 *                 price:
 *                   type: float
 *                 status:
 *                   type: string
 *                 category_id:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 description:
 *                   type: text
 *                 image_url:
 *                   type: string
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Product not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */


productRouter.get('/category/:categoryId', getProductByCategoryIdHandler);
productRouter.put('/:id', updateProductHandler);
productRouter.delete('/:id', deleteProductHandler);
productRouter.get('/:id', getProductByIdHandler);

export default productRouter;
