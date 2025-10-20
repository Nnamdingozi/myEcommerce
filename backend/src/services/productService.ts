// src/services/productService.ts

import { PrismaClient, Product, Category} from '@prisma/client';
import { Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new product
export const createProduct = async (
  productData: Prisma.ProductCreateInput
): Promise<Product> => {

  const newProduct = await prisma.product.create({
    data: productData,
  });
  return newProduct;
};

// Interface for filtering options
interface GetProductsOptions {
  categoryId?: number;
  limit?: number;
  offset?: number;
}

// Get multiple products with optional filtering and pagination
export const getProducts = async (options: GetProductsOptions = {}): Promise<Product[]> => {
  const { categoryId, limit = 15, offset = 0 } = options;

  // Build the 'where' clause dynamically based on provided options
  const where: Prisma.ProductWhereInput = {};
  if (categoryId) {
    where.categoryId = categoryId;
  }

  const products = await prisma.product.findMany({
    where,
    take: limit, 
    skip: offset, 
    orderBy: {
      createdAt: 'asc',
    },
    include: { 
      category: true,
    },
  });
  return products;
};

// Get a single product by its ID
export const getProductById = async (id: number): Promise<Product | null> => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { 
      category: true,
      merchant: true,
    },
  });
  return product;
};

// Update a product by its ID
export const updateProduct = async (
  id: number,
  productData: Prisma.ProductUpdateInput
): Promise<Product> => {

  const updatedProduct = await prisma.product.update({
    where: { id },
    data: productData,
  });
  return updatedProduct;
};

// Delete a product by its ID
export const deleteProduct = async (id: number): Promise<Product> => {
  
  const deletedProduct = await prisma.product.delete({
    where: { id },
  });
  return deletedProduct;
};


// --- Category Services ---

// Get all categories
export const getAllCategories = async (): Promise<Category[]> => {
  return prisma.category.findMany({
    orderBy: {
      categoryName: 'asc',
    },
  });
};

