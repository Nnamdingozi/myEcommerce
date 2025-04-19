
// const { 
//     createProduct, 
//     getAllProducts, 
//     getProductById, 
//     getAllCategories, 
//     getProductByCategory, 
//     updateProduct, 
//     deleteProduct 
// } = require('../services/productService');

// const createProductHandler = async (req, res) => {
//     try {
//         const { name, merchant_id, price, status, category_id, createdAt, updatedAt, description, image_url } = req.body;

//         // Validate required fields
//         if (!name || !merchant_id || !price || !status || !category_id) {
//             return res.status(400).json({ error: "Missing required fields" });
//         }

       

//         const newProduct = await createProduct({
//             name,
//             merchant_id,
//             price,
//             status,
//             category_id,
//             createdAt,
//             updatedAt,
//             description,
//             image_url
//         });

//         res.status(201).json(newProduct);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// const getAllProductsHandler = async (req, res) => {
//     try {
//         const getProducts = await getAllProducts();
//         res.status(200).json(getProducts);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// const getProductByIdHandler = async (req, res) => {
//     try {
//         const { id } = req.params;

     

//         const getProduct = await getProductById(id);
//         if (!getProduct) {
//             return res.status(404).json({ message: 'Product not found' });
//         }

//         res.status(200).json(getProduct);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// const getAllCategoriesHandler = async (req, res) => {
//     try {
//         const categories = await getAllCategories();
//         res.status(200).json(categories);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// const getProductByCategoryIdHandler = async (req, res) => {
//     try {
//         const { id } = req.params;

//         // // Validate the category ID
//         // if (!id || isNaN(id)) {
//         //     return res.status(400).json({ error: "Invalid category ID" });
//         // }

//         const getProduct = await getProductByCategory(id);
//         if (!getProduct || getProduct.length === 0) {
//             return res.status(404).json({ message: 'No products found for this category' });
//         }

//         res.status(200).json(getProduct);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// const updateProductHandler = async (req, res) => {
//     try {
//         const { id } = req.params;

//         // Validate the product ID
//         if (!id || isNaN(id)) {
//             return res.status(400).json({ error: "Invalid product ID" });
//         }

//         const updatedProduct = await updateProduct(id, req.body);
//         if (!updatedProduct) {
//             return res.status(404).json({ message: 'Product not found' });
//         }

//         res.status(200).json(updatedProduct);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// const deleteProductHandler = async (req, res) => {
//     try {
//         const { id } = req.params;

//         // // Validate the product ID
//         // if (!id || isNaN(id)) {
//         //     return res.status(400).json({ error: "Invalid product ID" });
//         // }

//         const deletedProduct = await deleteProduct(id);
//         if (!deletedProduct) {
//             return res.status(404).json({ message: 'Product not found' });
//         }

//         res.status(204).json();
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// module.exports = {
//     createProductHandler,
//     getAllProductsHandler,
//     getProductByIdHandler,
//     getAllCategoriesHandler,
//     getProductByCategoryIdHandler,
//     updateProductHandler,
//     deleteProductHandler
// };




import {  RequestHandler } from "express";
import {
    createProduct,
    getAllProducts,
    getProductById,
    getAllCategories,
    getProductByCategory,
    updateProduct,
    deleteProduct
} from "../services/productService";


export const createProductHandler: RequestHandler = async (req, res, next) => {
    try {
        const { name, merchant_id, price, status, category_id, description, image_url } = req.body;

        if (!name || !merchant_id || !price || !status || !category_id) {
            res.status(400).json({ error: "Missing required fields" });
            return;
        }

        const newProduct = await createProduct({
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

    } catch (err: any) {
        next(err);
    }
};

export const getAllProductsHandler: RequestHandler = async (req, res, next) => {
    try {
        const products = await getAllProducts();
        res.status(200).json(products);
    } catch (err: any) {
        next(err);
    }
};

export const getProductByIdHandler: RequestHandler = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ error: "Invalid product ID" });
            return;
        }

        const product = await getProductById(id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }

        res.status(200).json(product);
    } catch (err: any) {
        next(err);
    }
};

export const getAllCategoriesHandler: RequestHandler = async (req, res, next) => {
    try {
        const categories = await getAllCategories();
        res.status(200).json(categories);
    } catch (err: any) {
        next(err);
    }
};

export const getProductByCategoryIdHandler: RequestHandler = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ error: "Invalid category ID" });
            return;
        }

        const products = await getProductByCategory(id);
        if (!products || products.length === 0) {
            res.status(404).json({ message: "No products found for this category" });
            return;
        }

        res.status(200).json(products);
    } catch (err: any) {
        next(err);
    }
};

export const updateProductHandler: RequestHandler = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ error: "Invalid product ID" });
            return;
        }

        const updatedProduct = await updateProduct(id, req.body);
        if (!updatedProduct) {
            res.status(404).json({ message: "Product not found" });
            return;
        }

        res.status(200).json({ message: "Product updated successfully" });
    } catch (err: any) {
        next(err);
    }
};

export const deleteProductHandler: RequestHandler = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ error: "Invalid product ID" });
            return;
        }

        const deleted: boolean = await deleteProduct(id);
        if (!deleted) {
            res.status(404).json({ message: "Product not found" });
            return;
        }

        res.status(204).send();
    } catch (err: any) {
        next(err);
    }
};
