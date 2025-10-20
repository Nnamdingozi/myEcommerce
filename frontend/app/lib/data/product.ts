
// services/api/productService.ts (example file path)

import { Product, Category } from '@/app/lib/definition';
import axios from 'axios';


const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

// --- Type Definitions for Clarity ---
interface FetchProductsOptions {
  categoryId?: number;
  limit?: number;
  offset?: number;
}

/**
 * A flexible function to fetch a list of products.
 * Can fetch all products or filter by category.
 * @param options - Optional filtering criteria like `categoryId`.
 * @returns A promise that resolves to an array of products.
 */
export async function fetchProducts(options: FetchProductsOptions = {}): Promise<Product[]> {
  try {
    const response = await axios.get<Product[]>(`${backendUrl}/products`, { 
      params: options, 
      
    });
    return response.data;
  } catch (err: any) {
    const errorMessage = err.response?.data?.error || 'Failed to fetch products.';
    console.error('Error fetching products:', errorMessage);
    throw new Error(errorMessage); 
}
}

/**
 * Fetches a single product by its unique ID.
 * @param id - The ID of the product to fetch.
 * @returns A promise that resolves to a single product or throws an error.
 */
export async function fetchProductById(id: number): Promise<Product> {
  try {
    // The endpoint is for a specific resource: /products/{id}
    const response = await axios.get<Product>(`${backendUrl}/products/${id}`); 
    return response.data;
  } catch (err: any) {
    const errorMessage = err.response?.data?.error || `Failed to fetch product with ID ${id}.`;
    console.error('Error fetching product by ID:', errorMessage);
    throw new Error(errorMessage);
  }
}

/**
 * Fetches the list of all available product categories.
 * @returns A promise that resolves to an array of categories.
 */
export async function fetchCategories(): Promise<Category[]> {
  try {
    // The endpoint for all categories
    const response = await axios.get<Category[]>(`${backendUrl}/products/categories/all`); // FIX: More specific route
    return response.data;
  } catch (err: any) {
    const errorMessage = err.response?.data?.error || 'Failed to fetch categories.';
    console.error('Error fetching categories:', errorMessage);
    throw new Error(errorMessage);
  }
}