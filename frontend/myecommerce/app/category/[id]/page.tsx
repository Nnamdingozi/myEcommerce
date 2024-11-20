// // "use client";

// // import { useEffect, useState } from 'react';
// // import { Product } from '@/app/lib/definition';
// // import { fetchProductsByCategoryId } from '@/app/lib/data';
// // import CategoryProducts from '@/app/ui/categoryProducts';
// // import { useCart } from '@/app/context/cartContext';
// // import { useProduct } from '@/app/context/productContext';

// // // interface CategoryPageProps {
// // //   params: Promise<{ id: string }>;
// // // }



// // export default function CategoryPage({ 
// //     params, 
// // }: {
// //     params: Promise<{ id: string }>
// // }) {

// //   const [catProducts, setCatProducts] = useState<Product[]>([]);
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [error, setError] = useState<string | null>(null);
  
// //   const { addToCart, getUserCart } = useCart();


// //   useEffect(() => {
// //     const fetchByCat = async () => {
// //       try {
// //         setLoading(true);

// //         // Resolve the promise for params.id
      
// //         const resolvedParams = (await params).id
// //         const categoryId = parseInt(resolvedParams, 10); // Parse string id to a number

// //         if (isNaN(categoryId)) {
// //           throw new Error("Invalid category ID provided.");
// //         }

// //         const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
// //         const categoryproducts: Product[] = await fetchProductsByCategoryId(categoryId);
// //         console.log('category Products fetched:', categoryproducts);

// //         const modifiedCategoryProducts = categoryproducts.map((categoryproduct) => ({
// //           ...categoryproduct,
// //           image_url: `${backendUrl}${categoryproduct.image_url}`
// //         }));

// //         setCatProducts(modifiedCategoryProducts);
// //       } catch (err) {
// //         console.error('Error fetching products for this category:', err);
// //         setError('Failed to fetch products for this category');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchByCat();
// //   }, [params]);

// //   if (loading) return <p>Loading...</p>;
// //   if (error) return <p>{error}</p>;

// //   return (
// //     <CategoryProducts
// //       categoryproducts={catProducts}
// //       addToCart={addToCart}
// //       getUserCart={getUserCart}
// //     />
// //   );
// // }




// "use client";

// import { useEffect, useState } from 'react';
// import { ProductDetails } from '@/app/lib/definition';
// import CategoryProducts from '@/app/ui/categoryProducts';
// import { useCart } from '@/app/context/cartContext';
// import { useProduct } from '@/app/context/productContext';

// export default function CategoryPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { error, loading, getProductsByCategoryId } = useProduct();
//   const { addToCart, getUserCart } = useCart();
//   const [catProducts, setCatProducts] = useState<ProductDetails[]>([]);
//   const [successMessage, ] = useState('')
//   const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

//   useEffect(() => {
//     const fetchByCat = async () => {
//       try {
//         const resolvedParams = (await params).id;
//         const categoryId = parseInt(resolvedParams, 10);

//         if (isNaN(categoryId)) {
//           throw new Error("Invalid category ID provided.");
//         }

//         const fetchedProducts: ProductDetails[] | null | undefined = await getProductsByCategoryId(categoryId);

//         if (fetchedProducts && fetchedProducts.length > 0) {
//           const modifiedProducts = fetchedProducts.map(product => ({
//             ...product,
//             image_url: `${baseUrl}${product.image_url}`,
            
//           }));
//           setCatProducts(modifiedProducts);
        

//         } else {
//           setCatProducts([]);
//         }
//       } catch (err) {
//         console.error("Error fetching products:", err);
//       }
//     };

//     fetchByCat();
//   }, [params]);

//   if (loading) return <p>Loading products...</p>;
//   if (error) return <p>{error}</p>;

//   if (!catProducts || catProducts.length === 0) {
//     return <p>No products found</p>;
//   }

//   return (
//     <CategoryProducts
//       categoryproducts={catProducts}
//       addToCart={addToCart}
//       getUserCart={getUserCart}
//    
//     />
//   );
// }


"use client";

import { useEffect, useState } from 'react';
import { ProductDetails } from '@/app/lib/definition';
import CategoryProducts from '@/app/ui/categoryProducts';
import { useCart } from '@/app/context/cartContext';
import { useProduct } from '@/app/context/productContext';

export default function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { error, loading, getProductsByCategoryId } = useProduct();
  const { addToCart, getUserCart } = useCart();
  const [catProducts, setCatProducts] = useState<ProductDetails[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchByCat = async () => {
      try {
        const resolvedParams = (await params).id;
        const categoryId = parseInt(resolvedParams, 10);

        if (isNaN(categoryId)) {
          throw new Error("Invalid category ID provided.");
        }

        const fetchedProducts: ProductDetails[] | null | undefined = await getProductsByCategoryId(categoryId);

        if (fetchedProducts && fetchedProducts.length > 0) {
          const modifiedProducts = fetchedProducts.map(product => ({
            ...product,
            image_url: `${baseUrl}${product.image_url}`,
          }));
          setCatProducts(modifiedProducts);
        } else {
          setCatProducts([]);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchByCat();
  }, [params]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  if (!catProducts || catProducts.length === 0) {
    return <p>No products found</p>;
  }

  return (
    <>
      <CategoryProducts
        categoryproducts={catProducts}
        addToCart={addToCart}
        getUserCart={getUserCart}
        successMessage={successMessage}
        setSuccessMessage={setSuccessMessage}
      />
      {/* Success Message Notification */}
      {successMessage && (
        <div className="fixed top-32 right-16 bg-green-700 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300">
          {successMessage}
        </div>
      )}
    </>
  );
}
