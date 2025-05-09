
'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/app/lib/definition';
import CategoryProducts from '@/app/ui/categoryProducts';
import { useProduct } from '@/app/context/productContext';



interface Params {
  id: string;
}

interface CategoryPageProps {
  params: Promise<Params>;
}


export default function CategoryPage({ params: paramsPromise }: CategoryPageProps) {
  const { error, loading, getProductsByCategoryId } = useProduct();
  const [catProducts, setCatProducts] = useState<Product[]>([]);
  const [id, setId] = useState<string | null>(null);

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';



  useEffect(() => {
    paramsPromise.then(({ id }) => setId(id));
  }, [paramsPromise]);


  useEffect(() => {
    const fetchByCat = async () => {
      try {
        const categoryId = parseInt(id!, 10);

        if (isNaN(categoryId)) {
          throw new Error("Invalid category ID provided.");
        }

        const fetchedProducts = await getProductsByCategoryId(categoryId);

        if (fetchedProducts && fetchedProducts.length > 0) {
          const modifiedProducts = fetchedProducts.map(product => ({
            ...product,
            image_url: `${baseUrl}${product.image_url}`,
          }));
          setCatProducts(modifiedProducts);
        } else {
          setCatProducts([])
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchByCat();
  }, [id, getProductsByCategoryId, baseUrl]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;
  if (!catProducts || catProducts.length === 0) return <p>No products found</p>;

  return (
    <>
      <CategoryProducts
        catProducts={catProducts}
      />


    </>
  );
}



