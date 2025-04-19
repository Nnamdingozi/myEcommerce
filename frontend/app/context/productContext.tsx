
// 'use client';

// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { ProductDetails } from '@/app/lib/definition';

// interface ProductContextType {
//   products: ProductDetails[];
//   loading: boolean;
//   error: string | null;
//   getProducts: () => Promise<ProductDetails[] | null | undefined>;
//   getProductsByCategoryId: (id: number) => Promise<ProductDetails[] | null | undefined>;
//   setProducts: React.Dispatch<React.SetStateAction<ProductDetails[]>>;
// }

// const ProductContext = createContext<ProductContextType | null>(null);

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
//         const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:5000';
//         const productValue: ProductDetails[] | null | undefined = await getProducts();

//         if (Array.isArray(productValue)) {
//           const modifiedProducts = productValue.map((product) => ({
//             ...product,
//             image_url: `${baseUrl}${product.image_url}`,
//           }));
//           setProducts(modifiedProducts);
//         }
//       } catch (err: any) {
//         console.error('Error fetching products in context:', err);
//       }
//     };

//     fetchProducts();
//   }, [getProducts]);

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


// "use client";

// import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
// import { ProductDetails } from '@/app/lib/definition';
// import { fetchProducts, fetchProductsByCategoryId } from '@/app/lib/data';

// interface ProductContextType {
//   products: ProductDetails[];
//   loading: boolean;
//   error: string | null;
//   getProductsByCategoryId: (id: number) => Promise<void>;
//   setProducts: React.Dispatch<React.SetStateAction<ProductDetails[]>>;
// }

// const ProductContext = createContext<ProductContextType | null>(null);

// export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [products, setProducts] = useState<ProductDetails[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const getProducts = useCallback(async () => {
//     setLoading(true);
//     setError(null)
//     try {
//       const items: ProductDetails[] = await fetchProducts() || [];
//       if (items.length > 0) {
//         const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:5000';
//         const modifiedProducts = items.map((product) => ({
//           ...product,
//           image_url: `${baseUrl}${product.image_url}`,
//         }));
//         setProducts(modifiedProducts);
//       }
//     } catch (err) {
//       setError('Failed to fetch products');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const getProductsByCategoryId = useCallback(async (id: number) => {
//     setLoading(true);
//     setError(null)
//     try {
//       const items: ProductDetails[] = await fetchProductsByCategoryId(id) || [];
//       if (items.length > 0) {
//         setProducts(items);
//       }
//     } catch (err) {
//       setError('Failed to fetch products by category');
//     } finally {
//       setLoading(false);
//     }
//   }, []);


//   return (
//     <ProductContext.Provider
//       value={{
//         products,
//         loading,
//         error,
//         getProductsByCategoryId,
//         setProducts,
//       }}
//     >
//       {children}
//     </ProductContext.Provider>
//   );
// };

// export const useProduct = () => {
//   const context = useContext(ProductContext);
//   if (!context) {
//     throw new Error('ProductContext must be used within a ProductProvider');
//   }
//   return context;
// };


"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { ProductDetails, Product } from '@/app/lib/definition';
import { fetchProducts, fetchProductsByCategoryId } from '@/app/lib/data/product';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  getProducts: () => Promise<void>;
  getProductsByCategoryId: (id: number) => Promise<void>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:5000';

  // Utility to format product image URLs
  // const formatProductImages = (items: Product[]) =>
  //   items.map(product => ({
  //     ...product,
  //     image_url: `${baseUrl}${product.image_url}`,
  //   }));

  // // Fetch all products
  // const getProducts = useCallback(async () => {
  //   setLoading(true);
  //   setError(null); // Clear previous errors
  //   try {
  //     const items: Product[] = await fetchProducts() || [];
  //     if (items.length > 0) {
  //       setProducts(formatProductImages(items));
  //     }
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : 'Failed to fetch products');
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [formatProductImages]);



  const getProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await fetchProducts() || [];
      if (items.length) {
        setProducts(
          items.map(p => ({
            ...p,
            image_url: `${baseUrl}${p.image_url}`,
          }))
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, [baseUrl]); // ✅ Only changes when baseUrl changes
  

  // Fetch products by category ID
  const getProductsByCategoryId = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const items: Product[] = await fetchProductsByCategoryId(id) || [];
      if (items.length) {
        setProducts(
          items.map(p => ({
            ...p,
            image_url: `${baseUrl}${p.image_url}`,
          }))
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products by category');
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  // Memoize context value to optimize re-renders
  const contextValue = useMemo(() => ({
    products,
    loading,
    error,
    getProducts,
    getProductsByCategoryId,
    setProducts,
  }), [products, loading, error, getProducts, getProductsByCategoryId]);
  

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('ProductContext must be used within a ProductProvider');
  }
  return context;
};
