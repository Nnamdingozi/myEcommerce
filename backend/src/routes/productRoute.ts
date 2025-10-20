// src/routes/productRouter.ts

import express from 'express';
import {
    createProductHandler,
    getProductsHandler, 
    getProductByIdHandler,
    updateProductHandler,
    deleteProductHandler,
    getAllCategoriesHandler
} from "../controllers/productController";

const productRouter = express.Router();

productRouter.route('/')
    .post(createProductHandler)
    .get(getProductsHandler);

// Route for a single product resource
productRouter.route('/:id')
    .get(getProductByIdHandler)
    .put(updateProductHandler)
    .delete(deleteProductHandler);

// Route for categories
productRouter.get('/categories/all', getAllCategoriesHandler); // Using a more descriptive path

export default productRouter;