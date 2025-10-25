
'use client';

import { useEffect, useState } from 'react';
import Hero from '@/app/ui/hero';
import Products from '@/app/ui/products';
import Categories from '@/app/ui/categories';
import { useProduct } from './context/productContext';
import { fetchCategories } from '@/app/lib/data/product';
import { Category } from './lib/definition';
import { ProductCardSkeleton } from '@/app/ui/product-card-skeleton';

// --- Import Card and an skeleton ---
import { HeroSkeleton } from './ui/hero-skeleton';
import { ErrorCard } from './ui/errorCard';

export default function Home() {
  const { products, getProducts, loading, error } = useProduct(); 
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (err: any) {
        setCategoryError(err.message || 'Failed to fetch categories');
      }
    };
    loadCategories();
  }, []);


     // --- LOADING STATE ---
  if (loading) {
    return (
      <div className="flex flex-col lg:flex-row min-h-screen">
        <aside className="w-full lg:w-64 border-r p-4">
          {/* ... skeleton for categories ... */}
        </aside>
        <main className="flex-1">
          {/* 2. ADD THE HERO SKELETON  */}
          <HeroSkeleton />
          
          {/* Product Grid Skeleton */}
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }
  

  // --- ERROR STATE (Refactored to use a Card) ---
  const displayError = error || categoryError;
  if (displayError) {
    return (
      <ErrorCard errorMessage='displayError'/>
      
    );
  }
  

  // --- SUCCESS STATE ---
  return (
    <div className="flex flex-col lg:flex-row">
      <aside className="w-full lg:w-64 border-r">
        <Categories categories={categories} />
      </aside>
      <main className="flex-1">
        <Hero />
        <Products products={products} />
      </main>
    </div>
  );
}