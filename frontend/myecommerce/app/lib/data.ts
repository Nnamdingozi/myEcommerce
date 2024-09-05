import axios from 'axios';
import { Product, Category } from '@/app/lib/definition';

export async function fetchProducts(): Promise<Product[]> {
    // let products = [];
  try {
    const response = await axios.get<Product[]>('http://localhost:5000/product');
    //  products = await response.data;
    console.log('product response received:', response.data)
     return response.data;
    
    } catch(err) {
        console.error('Error fetching data', err)
        return [];
  
      }

};
export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await axios.get<Category[]>('http://localhost:5000/product/categories');
    console.log('catogories received:', response.data);
    return response.data

  } catch(err) {
    console.error('Error fetching data', err)
    return [];

  }
}

export async function fetchProductsByCategoryId( id: string): Promise<Product[]> {
  
  try {
    const categoryData = await axios.get(`http://localhost:5000/product/categoryProduct/${id}`);
return categoryData.data;
  } catch(err) {
    console.error('Error fetching data', err)
    return [];

  }
  
}

