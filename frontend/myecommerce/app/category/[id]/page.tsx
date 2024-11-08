"use client"; // Assuming the component is intended to run on the client side

import { useEffect, useState } from 'react';
import { Product } from '@/app/lib/definition';
import { fetchProductsByCategoryId } from '@/app/lib/data';
import CategoryProducts from '@/app/ui/categoryProducts';
import { useCart } from '@/app/context/cartContext';

interface CategoryPageProps {
  params: { id: string };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [catProducts, setCatProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { addToCart, getUserCart } = useCart();

  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const fetchByCat = async () => {
      try {
        const categoryproducts: Product[] = await fetchProductsByCategoryId(params.id);
        console.log('category Products fetched:', categoryproducts);

        const modifiedCategoryProducts = categoryproducts.map((categoryproduct) => ({
          ...categoryproduct,
          image_url: `${backendUrl}${categoryproduct.image_url}`
        }));

        setCatProducts(modifiedCategoryProducts);
      } catch (err) {
        console.error('Error fetching products for this category', err);
        setError('Failed to fetch products for this category');
      } finally {
        setLoading(false);
      }
    };
    fetchByCat();
  }, [params.id]);

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