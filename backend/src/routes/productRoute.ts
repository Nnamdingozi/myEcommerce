
// // const express = require('express');
// // const productRouter = express.Router();
// // const {createProductHandler,
// //     getAllProductsHandler,
// //     getProductByIdHandler,
// //     getAllCategoriesHandler,
// //     getProductByCategoryIdHandler,
// //     updateProductHandler,
// //     deleteProductHandler
// // } = require("../controllers/productController");

// // /**
// //  * @swagger
// //  * /products:
// //  *   get:
// //  *     summary: Retrieve all products
// //  *     description: Retrieves a list of all products available in the database.
// //  *     responses:
// //  *       200:
// //  *         description: A list of all products
// //  *         content:
// //  *           application/json:
// //  *             schema:
// //  *               type: array
// //  *               items:
// //  *                 type: object
// //  *                 properties:
// //  *                   id:
// //  *                     type: integer
// //  *                   name:
// //  *                     type: string
// //  *                   merchant_id: 
// //  *                     type: integer
// //  *                   price:
// //  *                     type: float
// //  *                   status:
// //  *                     type: string
// //  *                   category_id:
// //  *                     type: integer
// //  *                   createdAt:
// //  *                     type: string
// //  *                     format: date-time
// //  *                   updatedAt:
// //  *                     type: string
// //  *                     format: date-time
// //  *                   description:
// //  *                     type: text
// //  *                   image_url:
// //  *                     type: string
// //  *       500:
// //  *         description: Internal server error
// //  *         content:
// //  *           application/json:
// //  *             schema:
// //  *               type: object
// //  *               properties:
// //  *                 error:
// //  *                   type: string
// //  */
// //  productRouter.post('/', createProductHandler);
// //  productRouter.get('/', getAllProductsHandler);
// //  productRouter.get('/categories', getAllCategoriesHandler);
// //  productRouter.get('/categoryProduct/:id', getProductByCategoryIdHandler)
 
// //  /**
// //  * @swagger
// //  * /products/{id}:
// //  *   get:
// //  *     summary: Retrieve a product by ID
// //  *     description: Fetches a single product from the database by its ID.
// //  *     parameters:
// //  *       - in: path
// //  *         name: id
// //  *         required: true
// //  *         description: The ID of the product to retrieve
// //  *         schema:
// //  *           type: string
// //  *     responses:
// //  *       200:
// //  *         description: Product retrieved successfully
// //  *         content:
// //  *           application/json:
// //  *             schema:
// //  *               type: object
// //  *               properties:
// //  *                 id:
// //  *                   type: integer
// //  *                 name:
// //  *                   type: string
// //  *                 merchant_id:
// //  *                   type: integer
// //  *                 price:
// //  *                   type: float
// //  *                 status:
// //  *                   type: string
// //  *                 category_id:
// //  *                   type: integer
// //  *                 createdAt:
// //  *                   type: string
// //  *                   format: date-time
// //  *                 updatedAt:
// //  *                   type: string
// //  *                   format: date-time
// //  *                 description:
// //  *                   type: text
// //  *                 image_url:
// //  *                   type: string
// //  *       404:
// //  *         description: Product not found
// //  *         content:
// //  *           application/json:
// //  *             schema:
// //  *               type: object
// //  *               properties:
// //  *                 error:
// //  *                   type: string
// //  *                   example: Product not found
// //  *       500:
// //  *         description: Internal server error
// //  *         content:
// //  *           application/json:
// //  *             schema:
// //  *               type: object
// //  *               properties:
// //  *                 error:
// //  *                   type: string
// //  */
// //  productRouter.get('/:id', getProductByIdHandler);

// //  /**
// //  * @swagger
// //  * /products/category/{categoryId}:
// //  *   get:
// //  *     summary: Retrieve products by category ID
// //  *     description: Fetches all products associated with a specific category from the database.
// //  *     parameters:
// //  *       - in: path
// //  *         name: categoryId
// //  *         required: true
// //  *         description: The ID of the category whose products are to be retrieved
// //  *         schema:
// //  *           type: string
// //  *     responses:
// //  *       200:
// //  *         description: Products retrieved successfully
// //  *         content:
// //  *           application/json:
// //  *             schema:
// //  *               type: array
// //  *               items:
// //  *                 type: object
// //  *                 properties:
// //  *                 id:
// //  *                   type: integer
// //  *                 name:
// //  *                   type: string
// //  *                 merchant_id:
// //  *                   type: integer
// //  *                 price:
// //  *                   type: float
// //  *                 status:
// //  *                   type: string
// //  *                 category_id:
// //  *                   type: integer
// //  *                 createdAt:
// //  *                   type: string
// //  *                   format: date-time
// //  *                 updatedAt:
// //  *                   type: string
// //  *                   format: date-time
// //  *                 description:
// //  *                   type: text
// //  *                 image_url:
// //  *                   type: string
// //  *       404:
// //  *         description: Products not found in the specified category
// //  *         content:
// //  *           application/json:
// //  *             schema:
// //  *               type: object
// //  *               properties:
// //  *                 error:
// //  *                   type: string
// //  *                   example: Products not found
// //  *       500:
// //  *         description: Internal server error
// //  *         content:
// //  *           application/json:
// //  *             schema:
// //  *               type: object
// //  *               properties:
// //  *                 error:
// //  *                   type: string
// //  */
// //  productRouter.get('/category/:categoryId', getProductByCategoryIdHandler);

// //  /**
// //  * @swagger
// //  * /products/{id}:
// //  *   put:
// //  *     summary: Update a product by ID
// //  *     description: Updates the details of an existing product in the database using the product's ID.
// //  *     parameters:
// //  *       - in: path
// //  *         name: id
// //  *         required: true
// //  *         description: The ID of the product to update
// //  *         schema:
// //  *           type: string
// //  *       - in: body
// //  *         name: product
// //  *         description: The updated product data
// //  *         required: true
// //  *         schema:
// //  *           type: object
// //  *           properties:
// //  *              properties:
// //  *                 name:
// //  *                   type: string
// //  *                 merchant_id:
// //  *                   type: integer
// //  *                 price:
// //  *                   type: float
// //  *                 status:
// //  *                   type: string
// //  *                 category_id:
// //  *                   type: integer
// //  *                 description:
// //  *                   type: text
// //  *                 image_url:
// //  *                   type: string
// //  *     responses:
// //  *       200:
// //  *         description: Product updated successfully
// //  *         content:
// //  *           application/json:
// //  *             schema:
// //  *               type: object
// //  *               properties:
// //  *                 name:
// //  *                   type: string
// //  *                 merchant_id:
// //  *                   type: integer
// //  *                 price:
// //  *                   type: float
// //  *                 status:
// //  *                   type: string
// //  *                 category_id:
// //  *                   type: integer
// //  *                 description:
// //  *                   type: text
// //  *                 image_url:
// //  *                   type: string
// //  *       400:
// //  *         description: Bad request or invalid data
// //  *         content:
// //  *           application/json:
// //  *             schema:
// //  *               type: object
// //  *               properties:
// //  *                 error:
// //  *                   type: string
// //  *                   example: Invalid product data
// //  *       404:
// //  *         description: Product not found
// //  *         content:
// //  *           application/json:
// //  *             schema:
// //  *               type: object
// //  *               properties:
// //  *                 error:
// //  *                   type: string
// //  *                   example: Product not found
// //  *       500:
// //  *         description: Internal server error
// //  *         content:
// //  *           application/json:
// //  *             schema:
// //  *               type: object
// //  *               properties:
// //  *                 error:
// //  *                   type: string
// //  */
// //  productRouter.put('/:id', updateProductHandler);


// //  /**
// //  * @swagger
// //  * /products/{id}:
// //  *   delete:
// //  *     summary: Delete a product by ID
// //  *     description: Deletes an existing product from the database using the product's ID.
// //  *     parameters:
// //  *       - in: path
// //  *         name: id
// //  *         required: true
// //  *         description: The ID of the product to delete
// //  *         schema:
// //  *           type: string
// //  *     responses:
// //  *       200:
// //  *         description: Product deleted successfully
// //  *         content:
// //  *           application/json:
// //  *             schema:
// //  *               type: object
// //  *               properties:
// //  *                 message:
// //  *                   type: string
// //  *                   example: Product deleted successfully
// //  *       404:
// //  *         description: Product not found
// //  *         content:
// //  *           application/json:
// //  *             schema:
// //  *               type: object
// //  *               properties:
// //  *                 error:
// //  *                   type: string
// //  *                   example: Product not found
// //  *       500:
// //  *         description: Internal server error
// //  *         content:
// //  *           application/json:
// //  *             schema:
// //  *               type: object
// //  *               properties:
// //  *                 error:
// //  *                   type: string
// //  */
// //  productRouter.delete('/:id', deleteProductHandler);

// //  module.exports = productRouter;



// import express, { Request, Response } from 'express';
// import {
//   createProductHandler,
//   getAllProductsHandler,
//   getProductByIdHandler,
//   getAllCategoriesHandler,
//   getProductByCategoryIdHandler,
//   updateProductHandler,
//   deleteProductHandler
// } from '../controllers/productController';

// const productRouter = express.Router();

// /**
//  * @swagger
//  * /products:
//  *   get:
//  *     summary: Retrieve all products
//  *     description: Retrieves a list of all products available in the database.
//  *     responses:
//  *       200:
//  *         description: A list of all products
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 type: object
//  *                 properties:
//  *                   id:
//  *                     type: integer
//  *                   name:
//  *                     type: string
//  *                   merchant_id: 
//  *                     type: integer
//  *                   price:
//  *                     type: number
//  *                   status:
//  *                     type: string
//  *                   category_id:
//  *                     type: integer
//  *                   createdAt:
//  *                     type: string
//  *                     format: date-time
//  *                   updatedAt:
//  *                     type: string
//  *                     format: date-time
//  *                   description:
//  *                     type: string
//  *                   image_url:
//  *                     type: string
//  *       500:
//  *         description: Internal server error
//  */
// productRouter.post('/', createProductHandler as re);
// productRouter.get('/', getAllProductsHandler);
// productRouter.get('/categories', getAllCategoriesHandler);
// productRouter.get('/categoryProduct/:id', getProductByCategoryIdHandler);

// /**
//  * @swagger
//  * /products/{id}:
//  *   get:
//  *     summary: Retrieve a product by ID
//  *     description: Fetches a single product from the database by its ID.
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: Product retrieved successfully
//  *       404:
//  *         description: Product not found
//  *       500:
//  *         description: Internal server error
//  */
// productRouter.get('/:id', getProductByIdHandler);

// /**
//  * @swagger
//  * /products/category/{categoryId}:
//  *   get:
//  *     summary: Retrieve products by category ID
//  *     description: Fetches all products associated with a specific category.
//  *     parameters:
//  *       - in: path
//  *         name: categoryId
//  *         required: true
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: Products retrieved successfully
//  *       404:
//  *         description: Products not found in the specified category
//  *       500:
//  *         description: Internal server error
//  */
// productRouter.get('/category/:categoryId', getProductByCategoryIdHandler);

// /**
//  * @swagger
//  * /products/{id}:
//  *   put:
//  *     summary: Update a product by ID
//  *     description: Updates the details of an existing product.
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               name:
//  *                 type: string
//  *               merchant_id:
//  *                 type: integer
//  *               price:
//  *                 type: number
//  *               status:
//  *                 type: string
//  *               category_id:
//  *                 type: integer
//  *               description:
//  *                 type: string
//  *               image_url:
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: Product updated successfully
//  *       400:
//  *         description: Bad request or invalid data
//  *       404:
//  *         description: Product not found
//  *       500:
//  *         description: Internal server error
//  */
// productRouter.put('/:id', updateProductHandler);

// /**
//  * @swagger
//  * /products/{id}:
//  *   delete:
//  *     summary: Delete a product by ID
//  *     description: Deletes an existing product.
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: Product deleted successfully
//  *       404:
//  *         description: Product not found
//  *       500:
//  *         description: Internal server error
//  */
// productRouter.delete('/:id', deleteProductHandler);

// export default productRouter;




import express, { RequestHandler } from 'express';
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
