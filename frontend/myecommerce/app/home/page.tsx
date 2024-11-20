// 

'use client';

import { useEffect, useState } from 'react';
import Hero from '@/app/ui/hero';
import Products from '@/app/ui/products';
import Categories from '@/app/ui/categories';
import { Category } from '@/app/lib/definition';
import { fetchCategories } from '@/app/lib/data';
import { useCart } from '../context/cartContext';
import { useProduct } from '@/app/context/productContext';

export default function Home() {
  const { products, loading, error } = useProduct(); // Using ProductProvider context
  const [categoryData, setCategoryData] = useState<Category[] | null>(null);

  const { addToCart, getUserCart, cart } = useCart();

  // Fetch categories
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await fetchCategories();
        if (response) {
          setCategoryData(response);
        }
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategoryData();
  }, []);

  // Handle loading and error states for products
  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  if (!products || products.length === 0) {
    return <p className=''>No products found</p>;
  }

  return (
    <div className='flex flex-col lg:flex-row min-h-screen'>
      <div>
        <Categories categories={categoryData} />
      </div>
      <div className='mt-8 flex flex-col'>
        <Hero />
        <Products 
          products={products} 
          addToCart={addToCart} 
          getUserCart={getUserCart} 
          cart={cart} 
        />
      </div>
    </div>
  );
}
