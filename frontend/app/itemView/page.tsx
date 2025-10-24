
// 'use client';

// import { useEffect } from 'react';

// import ItemView from '@/app/ui/itemView';
// import { useProduct } from '@/app/context/productContext';
// import { ProductCardSkeleton } from '../ui/product-card-skeleton';
// import { ErrorCard } from '../ui/errorCard';




// export default function ProductViewPage({ id }: any) {
//   const { error, loading, getProductById, product } = useProduct();

//   const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';





//   useEffect(() => {
//     const fetchItemById = async () => {
//       try {
//         const productId = Number(id);

//         if (isNaN(productId)) {
//           throw new Error("Invalid product ID provided.");
//         }

//          await getProductById(productId);

//       } catch (err) {
//         console.error("Error fetching products:", err);
//       }
//     };

//     fetchItemById();
//   }, [id, getProductById, baseUrl]);

//   if (loading) return <ProductCardSkeleton/>
//   if (error) return <ErrorCard errorMessage='error'/>;
//   if (!product) return <p>No products found</p>;

//   return (
//     <>
//       <ItemView
//         product={product}
//       />


//     </>
//   );
// }



