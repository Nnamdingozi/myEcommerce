 // src/controllers/productController.ts


import { RequestHandler } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllCategories,
} from "../services/productService";
import { handleErrorResponse } from '../lib/error/handleErrorResponse';

export const createProductHandler: RequestHandler = async (req, res) => {
  try {
    // Expecting camelCase in the request body for consistency
    const { name, merchantId, price, status, categoryId, description, imageUrl } = req.body;

    if (!name || !merchantId || !price || !status || !categoryId) {
      res.status(400).json({ error: "Missing required fields" });
    }

    const newProduct = await createProduct({
      name,
      price,
      status,
      description,
      imageUrl,
      merchant: { connect: { id: merchantId } }, // This is how you connect a relation on create
      category: { connect: { id: categoryId } },
    });

    res.status(201).json(newProduct);
  } catch (err) {
    handleErrorResponse(err, res);
  }
};

// A single, flexible handler for getting products
export const getProductsHandler: RequestHandler = async (req, res) => {
  try {
    // Check for query parameters for filtering/pagination
    const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string, 10) : undefined;
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;
    const offset = req.query.offset ? parseInt(req.query.offset as string, 10) : undefined;

    const products = await getProducts({ categoryId, limit, offset });
    res.status(200).json(products);
  } catch (err) {
    handleErrorResponse(err, res);
  }
};

export const getProductByIdHandler: RequestHandler = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const product = await getProductById(id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    handleErrorResponse(err, res);
  }
};

export const updateProductHandler: RequestHandler = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updatedProduct = await updateProduct(id, req.body);
    res.status(200).json(updatedProduct);
  } catch (err) {
    handleErrorResponse(err, res);
  }
};

export const deleteProductHandler: RequestHandler = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await deleteProduct(id);
    res.status(204).send(); // Standard response for successful deletion
  } catch (err) {
    handleErrorResponse(err, res);
  }
};

// --- Category Handler ---

export const getAllCategoriesHandler: RequestHandler = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.status(200).json(categories);
  } catch (err) {
    handleErrorResponse(err, res);
  }
};