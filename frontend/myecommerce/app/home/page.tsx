'use client'

import { useEffect, useState } from 'react';
import Hero from '@/app/ui/hero';
import Products from '@/app/ui/products';
import  Categories  from '@/app/ui/categories'
import { fetchProducts } from '@/app/lib/data';
import { Product } from '@/app/lib/definition';
import { useRouter } from "next/navigation";
import { useCart } from '../context/cartContext';
import { fetchCategories } from '../lib/data';
import { Category } from '@/app/lib/definition';




export default  function Home() {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
const [ categoryData, setCategoryData] = useState<Category[] | null>(null)

   const router = useRouter();
const { addToCart, getUserCart} = useCart()
   
 useEffect(() => {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  const fetchData = async () => {
    try {
      const GetProducts: Product[] = await fetchProducts();

      const modifiedProducts = GetProducts.map(product => ({
        ...product,
        image_url: `${baseUrl}${product.image_url}`
      }));
      setProducts(modifiedProducts);
      console.log('products from fetchProducts call:', products)
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false)
    }
  } 
  fetchData()
 }, []);



   useEffect (()=> { 
    const catData = async()=> {
      try {
        const response = await fetchCategories();
        if (response) {
          setCategoryData(response)
        }
      } catch (error) {
        console.error('Error fetching categories', error)
        
      }
     
       
      

    } 
    catData();
   }, [])

 if (loading) return <p>Loading products...</p>;
 if (error) return <p>{error}</p>;
 
 if (!products || products.length === 0) {
    return <p className=''>No products found</p>;
  };



  return (
    <div className='flex flex-col lg:flex-row min-h-screen'>
      <div>
      <Categories categories = {categoryData}/>
      </div>
     
      <div className='mt-8 flex flex-col'>       
 <Hero />
 <Products 
 products={products} 
 addToCart = {addToCart}
 getUserCart={getUserCart}/>
    </div>
    </div>   
    
  );
};
