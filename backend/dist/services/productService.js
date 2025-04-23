"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductByCategory = exports.getAllCategories = exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
const product_1 = __importDefault(require("../database/models/product"));
const category_1 = __importDefault(require("../database/models/category"));
// Create a product and return plain object
const createProduct = async (productData) => {
    try {
        const newProduct = await product_1.default.create(productData);
        return newProduct.get({ plain: true });
    }
    catch (error) {
        throw new Error(`Product creation failed: ${error.message}`);
    }
};
exports.createProduct = createProduct;
// Get all products as plain objects
const getAllProducts = async () => {
    try {
        const products = await product_1.default.findAll({
            limit: 15,
            order: [["createdAt", "ASC"]],
        });
        if (!Array.isArray(products) || products.length === 0) {
            return [];
        }
        return products
            .filter((product) => product && typeof product.get === 'function')
            .map((product) => product.get({ plain: true }));
    }
    catch (error) {
        throw new Error(`Error fetching products: ${error.message}`);
    }
};
exports.getAllProducts = getAllProducts;
// Get one product as a plain object
const getProductById = async (id) => {
    try {
        const product = await product_1.default.findByPk(id);
        if (!product) {
            console.error("No product found.");
            return null;
        }
        return product.get({ plain: true });
    }
    catch (error) {
        throw new Error(`Error fetching product: ${error.message}`);
    }
};
exports.getProductById = getProductById;
// Get all categories as plain objects
const getAllCategories = async () => {
    try {
        const categories = await category_1.default.findAll();
        if (!categories || categories.length === 0) {
            console.error("No categories found.");
            return [];
        }
        return categories.map(category => category.get({ plain: true }));
    }
    catch (error) {
        throw new Error(`Error fetching categories: ${error.message}`);
    }
};
exports.getAllCategories = getAllCategories;
// Get products by category as plain objects
const getProductByCategory = async (categoryId) => {
    try {
        const products = await product_1.default.findAll({
            where: { category_id: categoryId },
            include: [{ model: category_1.default, as: "category" }],
        });
        if (!products || products.length === 0) {
            console.error("No products found that match this category.");
            return [];
        }
        return products.map(product => product.get({ plain: true }));
    }
    catch (error) {
        throw new Error(`Error fetching products by category: ${error.message}`);
    }
};
exports.getProductByCategory = getProductByCategory;
// Update product and return updated plain object
const updateProduct = async (id, productData) => {
    try {
        await product_1.default.update(productData, { where: { id } });
        const updated = await product_1.default.findByPk(id);
        if (!updated) {
            console.error("No product was updated.");
            return null;
        }
        return updated.get({ plain: true });
    }
    catch (error) {
        throw new Error(`Error updating product: ${error.message}`);
    }
};
exports.updateProduct = updateProduct;
// Delete product and return boolean
const deleteProduct = async (id) => {
    try {
        const destroyProduct = await product_1.default.destroy({ where: { id } });
        return destroyProduct > 0;
    }
    catch (error) {
        throw new Error(`Error deleting product: ${error.message}`);
    }
};
exports.deleteProduct = deleteProduct;
