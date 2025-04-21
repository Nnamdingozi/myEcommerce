
'use client'
import Hero from '@/app/ui/hero';
import Products from '@/app/ui/products';
import Categories from '@/app/ui/categories';
import { useProduct } from '../context/productContext';
import { useEffect, useState } from 'react';
import { fetchCategories } from '@/app/lib/data/product';
import { Category } from '../lib/definition';

export default function Home() {
  const { products, getProducts, loading, error } = useProduct();
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  // Fetch Products on Component Mount
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    console.log("getProducts function changed");
  }, [getProducts]);
  

  // Fetch Categories on Component Mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData || []);
      } catch (err) {
        setCategoryError('Failed to fetch categories');
      }
    };
    loadCategories();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;
  if (categoryError) return <p>{categoryError}</p>;

  if (!products || products.length === 0) {
    return <p>No products found</p>;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div>
        <Categories categories={categories} />
      </div>
      <div className="mt-8 flex flex-col">
        <Hero />
        <Products products={products} />

      </div>
    </div>
  );
}
