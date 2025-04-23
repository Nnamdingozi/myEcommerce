"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductHandler = exports.updateProductHandler = exports.getProductByCategoryIdHandler = exports.getAllCategoriesHandler = exports.getProductByIdHandler = exports.getAllProductsHandler = exports.createProductHandler = void 0;
const productService_1 = require("../services/productService");
const createProductHandler = async (req, res, next) => {
    try {
        const { name, merchant_id, price, status, category_id, description, image_url } = req.body;
        if (!name || !merchant_id || !price || !status || !category_id) {
            res.status(400).json({ error: "Missing required fields" });
            return;
        }
        const newProduct = await (0, productService_1.createProduct)({
            name,
            merchant_id,
            price,
            status,
            category_id,
            description,
            image_url
        });
        if (newProduct) {
            res.status(201).json(newProduct);
        }
    }
    catch (err) {
        next(err);
    }
};
exports.createProductHandler = createProductHandler;
const getAllProductsHandler = async (req, res, next) => {
    try {
        const products = await (0, productService_1.getAllProducts)();
        res.status(200).json(products);
    }
    catch (err) {
        next(err);
    }
};
exports.getAllProductsHandler = getAllProductsHandler;
const getProductByIdHandler = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ error: "Invalid product ID" });
            return;
        }
        const product = await (0, productService_1.getProductById)(id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json(product);
    }
    catch (err) {
        next(err);
    }
};
exports.getProductByIdHandler = getProductByIdHandler;
const getAllCategoriesHandler = async (req, res, next) => {
    try {
        const categories = await (0, productService_1.getAllCategories)();
        res.status(200).json(categories);
    }
    catch (err) {
        next(err);
    }
};
exports.getAllCategoriesHandler = getAllCategoriesHandler;
const getProductByCategoryIdHandler = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ error: "Invalid category ID" });
            return;
        }
        const products = await (0, productService_1.getProductByCategory)(id);
        if (!products || products.length === 0) {
            res.status(404).json({ message: "No products found for this category" });
            return;
        }
        res.status(200).json(products);
    }
    catch (err) {
        next(err);
    }
};
exports.getProductByCategoryIdHandler = getProductByCategoryIdHandler;
const updateProductHandler = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ error: "Invalid product ID" });
            return;
        }
        const updatedProduct = await (0, productService_1.updateProduct)(id, req.body);
        if (!updatedProduct) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json({ message: "Product updated successfully" });
    }
    catch (err) {
        next(err);
    }
};
exports.updateProductHandler = updateProductHandler;
const deleteProductHandler = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ error: "Invalid product ID" });
            return;
        }
        const deleted = await (0, productService_1.deleteProduct)(id);
        if (!deleted) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
};
exports.deleteProductHandler = deleteProductHandler;
