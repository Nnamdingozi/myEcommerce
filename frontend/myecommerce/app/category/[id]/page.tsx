"use client";

import { useEffect, useState } from 'react';
import { Product } from '@/app/lib/definition';
import { fetchProductsByCategoryId } from '@/app/lib/data';
import CategoryProducts from '@/app/ui/categoryProducts';
import { useCart } from '@/app/context/cartContext';

// interface CategoryPageProps {
//   params: Promise<{ id: string }>;
// }



export default function CategoryPage({ 
    params, 
}: {
    params: Promise<{ id: string }>
}) {

  const [catProducts, setCatProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const { addToCart, getUserCart } = useCart();

  useEffect(() => {
    const fetchByCat = async () => {
      try {
        setLoading(true);

        // Resolve the promise for params.id
      
        const resolvedParams = (await params).id
        const categoryId = parseInt(resolvedParams, 10); // Parse string id to a number

        if (isNaN(categoryId)) {
          throw new Error("Invalid category ID provided.");
        }

        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const categoryproducts: Product[] = await fetchProductsByCategoryId(categoryId);
        console.log('category Products fetched:', categoryproducts);

        const modifiedCategoryProducts = categoryproducts.map((categoryproduct) => ({
          ...categoryproduct,
          image_url: `${backendUrl}${categoryproduct.image_url}`
        }));

        setCatProducts(modifiedCategoryProducts);
      } catch (err) {
        console.error('Error fetching products for this category:', err);
        setError('Failed to fetch products for this category');
      } finally {
        setLoading(false);
      }
    };

    fetchByCat();
  }, [params]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <CategoryProducts
      categoryproducts={catProducts}
      addToCart={addToCart}
      getUserCart={getUserCart}
    />
  );
}
