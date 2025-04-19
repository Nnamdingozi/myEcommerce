
'use client'

import { useEffect, useState } from 'react';
import { useProduct } from '@/app/context/productContext';
import CategoryProducts from '@/app/ui/categoryProducts';

interface CategoryPageProps {
  params: { id: string };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryId = parseInt(params.id, 10);

  if (isNaN(categoryId)) {
    return <p>Invalid category ID.</p>;
  }

  return <CategoryPageClient categoryId={categoryId} />;
}

function CategoryPageClient({ categoryId }: { categoryId: number }) {
  const [clientSide, setClientSide] = useState(false); // To ensure client-side rendering
  const { getProductsByCategoryId, products, loading, error } = useProduct();

  useEffect(() => {
    setClientSide(true); // Indicate that we are now in client-side rendering
    getProductsByCategoryId(categoryId);
  }, [categoryId, getProductsByCategoryId]);

  if (!clientSide) {
    return null; // Avoid rendering until on the client
  }

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!products || products.length === 0) {
    return <p>No products found for this category.</p>;
  }

  return <CategoryProducts categoryproducts={products} categoryId={categoryId} />;
}
