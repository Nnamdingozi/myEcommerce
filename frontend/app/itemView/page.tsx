
'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/app/lib/definition';
import ProductView from '@/app/ui/itemView';
import { useProduct } from '@/app/context/productContext';



// interface Params {
//   id: string;
// }

// interface ItemViewPageProps {
//   params: Promise<Params>;
// }


export default function ProductViewPage({ id }: any) {
  const { error, loading, getProductById, product } = useProduct();
//   const [id, setId] = useState<string | null>(null);

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';



//   useEffect(() => {
//     paramsPromise.then(({ id }) => setId(id));
//   }, [paramsPromise]);


  useEffect(() => {
    const fetchItemById = async () => {
      try {
        const productId = Number(id);

        if (isNaN(productId)) {
          throw new Error("Invalid product ID provided.");
        }

         await getProductById(productId);

      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchItemById();
  }, [id, getProductById, baseUrl]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>No products found</p>;

  return (
    <>
      <ProductView
        product={product}
      />


    </>
  );
}



