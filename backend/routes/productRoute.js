
const express = require('express');
const productRouter = express.Router();
const {createProductHandler,
    getProductByIdHandler,
    getProductByCategoryIdHandler,
    updateProductHandler,
    deleteProductHandler
} = require("../controllers/productController");

 productRouter.post('/', createProductHandler);
 productRouter.get('/:id', getProductByIdHandler);
 productRouter.get('/category/:categoryId', getProductByCategoryIdHandler);
 productRouter.put('/:id', updateProductHandler);
 productRouter.delete('/:id', deleteProductHandler);

 module.exports = productRouter;
