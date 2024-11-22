// 'use client'


// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { ProductDetails } from '@/app/lib/definition';
// import { productHookLogic } from '@/app/lib/hooks/producthook';


// interface ProductContextType {
//   products: ProductDetails[];
//   loading: boolean;
//   error: string | null;
//   getProducts: () => Promise<ProductDetails[] | null | undefined>;
//   getProductsByCategoryId: (id: number) => Promise<ProductDetails[] | null | undefined>;
//   setProducts: React.Dispatch<React.SetStateAction<ProductDetails[]>>;
// }

// const ProductContext = createContext<ProductContextType | null | undefined>(null);

// export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [products, setProducts] = useState<ProductDetails[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const { getProducts, getProductsByCategoryId } = productHookLogic({
//     setProducts,
//     setLoading,
//     setError,
//     products,
//   });

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
//         const productValue: ProductDetails[] | null | undefined= await getProducts();

//         // Add baseUrl to image_url
//         if(productValue) {
//             const modifiedProducts = productValue.map(product => ({
//                 ...product,
//                 image_url: `${baseUrl}${product.image_url}`,
//               }));
//               setProducts(modifiedProducts);
//             }
        

        
//       } catch (err: any) {
//         console.error('error fetching products in context,'err)
  
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <ProductContext.Provider
//       value={{
//         products,
//         loading,
//         error,
//         getProducts,
//         getProductsByCategoryId,
//         setProducts,
//       }}
//     >
//       {children}
//     </ProductContext.Provider>
//   );
// };

// // Custom hook to use the ProductContext
// export const useProduct = () => {
//   const context = useContext(ProductContext);
//   if (!context) {
//     throw new Error('ProductContext must be used within a ProductProvider');
//   }
//   return context;
// };



'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ProductDetails } from '@/app/lib/definition';
import { productHookLogic } from '@/app/lib/hooks/producthook';

interface ProductContextType {
  products: ProductDetails[];
  loading: boolean;
  error: string | null;
  getProducts: () => Promise<ProductDetails[] | null | undefined>;
  getProductsByCategoryId: (id: number) => Promise<ProductDetails[] | null | undefined>;
  setProducts: React.Dispatch<React.SetStateAction<ProductDetails[]>>;
}

const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { getProducts, getProductsByCategoryId } = productHookLogic({
    setProducts,
    setLoading,
    setError,
    products,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:5000';
        const productValue: ProductDetails[] | null | undefined = await getProducts();

        if (Array.isArray(productValue)) {
          const modifiedProducts = productValue.map((product) => ({
            ...product,
            image_url: `${baseUrl}${product.image_url}`,
          }));
          setProducts(modifiedProducts);
        }
      } catch (err: any) {
        console.error('Error fetching products in context:', err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        getProducts,
        getProductsByCategoryId,
        setProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use the ProductContext
export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('ProductContext must be used within a ProductProvider');
  }
  return context;
};
