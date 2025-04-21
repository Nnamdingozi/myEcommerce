import { 
    Product, 
    Category, 
    ProductDetails
  } from '@/app/lib/definition';
  import axios from 'axios';
  
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
  
  
  export async function fetchProducts(): Promise<Product[]> {
    try {
      const response = await axios.get<Product[]>(`${backendUrl}/product`);
      console.log('Product response received:', response.data);
      return response.data;
    } catch (err) {
      console.error('Error fetching products:', err);
      return [];
    }
  }
  
  export async function fetchCategories(): Promise<Category[]> {
    try {
      const response = await axios.get<Category[]>(`${backendUrl}/product/categories`);
      return response.data;
    } catch (err: any) {
      console.error('Error fetching categories:', err.response?.data || err.message || err);
      return [];
    }
  }
  
  export async function fetchProductsByCategoryId(id: number): Promise<Product[]> {
    try {
      const response = await axios.get(`${backendUrl}/product/categoryProduct/${id}`);
      return response.data;
    } catch (err: any) {
      console.error('Error fetching products by category:', err);
      return [];
    }
  }
  
  