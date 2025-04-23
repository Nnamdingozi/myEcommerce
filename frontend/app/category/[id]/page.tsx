
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


export default function CategoryPage({ params: paramsPromise  }: CategoryPageProps) {
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
          setCatProducts([]);// 'use client'

// import { Product} from '@/app/lib/definition';
// import Image from 'next/image';
// import { useUser } from '../context/userContext';
// import { useCart } from '@/app/context/cartContext';
// import { useState } from 'react';

// interface CategoryproductProps {
//   categoryproducts: Product[];

// }

// const CategoryProducts: React.FC<CategoryproductProps> = ({
//   categoryproducts,
// }) => {
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const { token } = useUser();
//   const { cart, addToCart } = useCart();



//   // useEffect(() => {
//   //   console.log('Category ID has changed:', categoryId);
//   //   // You can trigger data fetching here if needed, 
//   //   // but make sure it's only done once per category change.
//   // }, [categoryId]); // This will run only when categoryId changes


//   console.log('categoryproducts value in props:', categoryproducts);

//   const handleAddToCart = async (token: string, productId: number) => {
//     if (!token) {
//       setSuccessMessage('Please register or log in to add items to your cart.');
//       setTimeout(() => {
//         setSuccessMessage(null);
//       }, 3000);
//       return;
//     }

//     // Check if the product is already in the cart
//     const isProductInCart = cart.some((item) => item.id === productId);
//     if (isProductInCart) {
//       setSuccessMessage('Product is already in the cart.');
//       setTimeout(() => {
//         setSuccessMessage(null);
//       }, 3000);
//       return;
//     }

//     try {
//       await addToCart(productId); // Add to cart
//       setSuccessMessage('Product added to cart successfully!');
//       setTimeout(() => {
//         setSuccessMessage(null);
//       }, 3000);
//     } catch (error) {
//       console.error('Error adding item to cart:', error);
//       setSuccessMessage('Failed to add product to cart.');
//       setTimeout(() => {
//         setSuccessMessage(null);
//       }, 3000);
//     }
//   };

//   if (!categoryproducts) return <p>Loading products...</p>;


//   return (
//     <div className="w-full h-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 mt-16">
//       {categoryproducts.map((categoryproduct) => (
//         <div
//           key={categoryproduct.id}
//           className="bg-gray-100 shadow-md rounded-lg overflow-hidden border-2 border-red-400 h-[500px] flex flex-col"
//         >
//           <Image
//             src={categoryproduct.image_url || '/images/img-1.jpg'}
//             alt={categoryproduct.name}
//             className="w-full h-1/2 object-cover"
//             width={500}
//             height={500}
//           />
//           <div className="p-4 mx-auto w-full h-[180px]">
//             <h2 className="text-xl font-semibold">{categoryproduct.name}</h2>
//             <p className="text-gray-600">{categoryproduct.description}</p>
//             <p className="text-green-500 font-bold">${categoryproduct.price}</p>
//           </div>
//           <button
//             className="bg-red-800 text-rose-100 w-[60%] mx-auto h-6 rounded-lg hover:bg-rose-100 hover:text-red-800"
//             onClick={() => handleAddToCart(token!, categoryproduct.id!)}
//           >
//             Add to Cart
//           </button>
//         </div>
//       ))}

//       {/* Success Message Notification */}
//       {successMessage && (
//         <div className="fixed top-32 right-16 bg-green-700 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300">
//           {successMessage}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CategoryProducts;




// const { error, loading, getProductsByCategoryId } = useProduct();
//   const [catProducts, setCatProducts] = useState<Product[]>([]);
//   const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

//   useEffect(() => {
//     const fetchByCat = async () => {
//       try {
//         const categoryId = parseInt(params.id, 10);

//         if (isNaN(categoryId)) {
//           throw new Error("Invalid category ID provided.");
//         }

//         const fetchedProducts = await getProductsByCategoryId(categoryId);

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
//   }, [params.id, getProductsByCategoryId, baseUrl]);

//   if (loading) return <p>Loading products...</p>;
//   if (error) return <p>{error}</p>;
//   if (!catProducts || catProducts.length === 0) return <p>No products found</p>;



// 'use client'

// import { Product} from '@/app/lib/definition';
// import Image from 'next/image';
// import { useUser } from '../context/userContext';
// import { useCart } from '@/app/context/cartContext';
// import { useState, useEffect } from 'react';
// import { useProduct } from '@/app/context/productContext';

// interface CategoryproductProps {
// catProduct : Product[]

// }

// const CategoryProducts: React.FC<CategoryproductProps> = ({
// catProduct
// }) => {
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const { token } = useUser();
//   const { cart, addToCart } = useCart();
//   const { error, loading, getProductsByCategoryId } = useProduct();
  
//   const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';




//     console.log('categoryproducts value in props:', catProducts);

//   const handleAddToCart = async (token: string, productId: number) => {
//     if (!token) {
//       setSuccessMessage('Please register or log in to add items to your cart.');
//       setTimeout(() => {
//         setSuccessMessage(null);
//       }, 3000);
//       return;
//     }

//     // Check if the product is already in the cart
//     const isProductInCart = cart.some((item) => item.id === productId);
//     if (isProductInCart) {
//       setSuccessMessage('Product is already in the cart.');
//       setTimeout(() => {
//         setSuccessMessage(null);
//       }, 3000);
//       return;
//     }

//     try {
//       await addToCart(productId); // Add to cart
//       setSuccessMessage('Product added to cart successfully!');
//       setTimeout(() => {
//         setSuccessMessage(null);
//       }, 3000);
//     } catch (error) {
//       console.error('Error adding item to cart:', error);
//       setSuccessMessage('Failed to add product to cart.');
//       setTimeout(() => {
//         setSuccessMessage(null);
//       }, 3000);
//     }
//   };

 
//   if (loading) return <p>Loading products...</p>;
//   if (error) return <p>{error}</p>;
//   if (!catProducts || catProducts.length === 0) return <p>No products found</p>;

//   return (
//     <div className="w-full h-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 mt-16">
//       {catProducts.map((catProduct) => (
//         <div
//           key={catProduct.id}
//           className="bg-gray-100 shadow-md rounded-lg overflow-hidden border-2 border-red-400 h-[500px] flex flex-col"
//         >
//           <Image
//             src={catProduct.image_url || '/images/img-1.jpg'}
//             alt={catProduct.name}
//             className="w-full h-1/2 object-cover"
//             width={500}
//             height={500}
//           />
//           <div className="p-4 mx-auto w-full h-[180px]">
//             <h2 className="text-xl font-semibold">{catProduct.name}</h2>
//             <p className="text-gray-600">{catProduct.description}</p>
//             <p className="text-green-500 font-bold">${catProduct.price}</p>
//           </div>
//           <button
//             className="bg-red-800 text-rose-100 w-[60%] mx-auto h-6 rounded-lg hover:bg-rose-100 hover:text-red-800"
//             onClick={() => handleAddToCart(token!, catProduct.id!)}
//           >
//             Add to Cart
//           </button>
//         </div>
//       ))}

//       {/* Success Message Notification */}
//       {successMessage && (
//         <div className="fixed top-32 right-16 bg-green-700 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300">
//           {successMessage}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CategoryProducts;






 
 

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






// import CategoryProducts from '@/app/ui/categoryProducts';


// interface CategoryPageProps {
//   params: { id: string };
// }

// export default function CategoryPage({ params }: CategoryPageProps) {
  
//   return (
//     <>
//       <CategoryProducts
//         catId={params.id}
//       />

      
//     </>
//   );
// }


// import CategoryProducts from '@/app/ui/categoryProducts';
// import { fetchCategories } from '@/app/lib/data/product';

// interface CategoryPageProps {
//   params: { id: string };
// }

// export default function CategoryPage({ params }: CategoryPageProps) {
//   const {id} = params
//   return (
//     <CategoryProducts catId={id} />
//   );
// }


// export async function generateStaticParams() {
//   const categories = await fetchCategories();
//   return categories.map((cat: { id: number }) => ({
//     id: cat.id.toString(),
//   }));
// }



// import CategoryProducts from '@/app/ui/categoryProducts';
// import { fetchCategories } from '@/app/lib/data/product';

// interface CategoryPageProps {
//   params: { id: string };
// }

// // ✅ Mark this as async if you are doing server-side logic like data fetching inside child components
// export default async function CategoryPage({ params }: CategoryPageProps) {
//   const { id } = params;

//   return <CategoryProducts catId={id} />;
// }






// // ✅ This is correct
// export async function generateStaticParams() {
//   const categories = await fetchCategories();
//   return categories.map((cat: { id: number }) => ({
//     id: cat.id.toString(),
//   }));
// }
