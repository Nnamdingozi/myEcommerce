// 'use client';

// import React, {
//   createContext,
//   useContext,
//   useState,
//   useCallback,
//   useMemo,
// } from 'react';
// import { Product, ProductDetails } from '@/app/lib/definition';
// import {
//   fetchProducts,
//   fetchProductsByCategoryId,
//   fetchProductId
// } from '@/app/lib/data/product';

// interface ProductContextType {
//   products: Product[];
//   product: Product | null;
//   loading: boolean;
//   error: string | null;
//   getProducts: () => Promise<void>;
//   getProductsByCategoryId: (id: number) => Promise<Product[]>;
//   setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
//   getProductById: (id: number) => Promise<Product | null>;
// }

// const ProductContext = createContext<ProductContextType | null>(null);

// export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [product, setProduct] = useState<Product | null>(null);

//   const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:5000';
 
//   const formatImageUrls = useCallback((items: Product[]) => {
//     return items.map((product) => ({
//       ...product,
//       image_url: `${baseUrl}${product.image_url}`,
//     }));
//   }, [baseUrl]);
  
//   const getProducts = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const items = (await fetchProducts()) || [];
//       if (items.length) {
//         setProducts(formatImageUrls(items));
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to fetch products');
//     } finally {
//       setLoading(false);
//     }
//   }, [formatImageUrls]);

//   const getProductsByCategoryId = useCallback(async (id: number): Promise<Product[]> => {
//     setLoading(true);
//     setError(null);
//     try {
//       const items = (await fetchProductsByCategoryId(id)) || [];
//       if (items.length) {
//         // setProducts(formatImageUrls(items));
//         return items
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to fetch products by category');
//     } finally {
//       setLoading(false);
//     }
//     return []
//   }, []);


//   const getProductById = useCallback(async (id: number): Promise<Product | null> => {
//     setLoading(true);
//     setError(null);
//     try {
//       const item = (await fetchProductId(id)) || null;
//       if (item) {
//         setProduct(item);
    
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to fetch products by category');
//     } finally {
//       setLoading(false);
//     }
//     return null
//   }, []);

//   const contextValue = useMemo(
//     () => ({
//       products,
//       product,
//       loading,
//       error,
//       getProducts,
//       getProductsByCategoryId,
//       setProducts,
//       getProductById
//     }),
//     [products, loading, error, getProducts, getProductsByCategoryId, product, getProductById]
//   );

//   return (
//     <ProductContext.Provider value={contextValue}>
//       {children}
//     </ProductContext.Provider>
//   );
// };

// export const useProduct = () => {
//   const context = useContext(ProductContext);
//   if (!context) {
//     throw new Error('useProduct must be used within a ProductProvider');
//   }
//   return context;
// };


'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { Product, ProductDetails } from '@/app/lib/definition';
import {
  fetchProducts,
  fetchProductsByCategoryId,
  fetchProductId
} from '@/app/lib/data/product';

interface ProductContextType {
  products: Product[];
  product: Product | null;
  loading: boolean;
  error: string | null;
  getProducts: () => Promise<void>;
  getProductsByCategoryId: (id: number) => Promise<Product[]>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  getProductById: (id: number) => Promise<Product | null>;
}

const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | null>(null);

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:5000';

  const formatImageUrl = useCallback((product: Product) => {
    return {
      ...product,
      image_url: `${baseUrl}${product.image_url}`,
    };
  }, [baseUrl]);

  const getProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const items = (await fetchProducts()) || [];
      if (items.length) {
        setProducts(items.map(formatImageUrl));  // Format image URLs for the list of products
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, [formatImageUrl]);

  const getProductsByCategoryId = useCallback(async (id: number): Promise<Product[]> => {
    setLoading(true);
    setError(null);
    try {
      const items = (await fetchProductsByCategoryId(id)) || [];
      if (items.length) {
        return items.map(formatImageUrl);  // Format image URLs for the list of products
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products by category');
    } finally {
      setLoading(false);
    }
    return [];
  }, [formatImageUrl]);

  const getProductById = useCallback(async (id: number): Promise<Product | null> => {
    setLoading(true);
    setError(null);
    try {
      const item = (await fetchProductId(id)) || null;
      if (item) {
        const productWithImage = formatImageUrl(item); // Set image URL for the single product
        setProduct(productWithImage);  // Store the product with image URL
        return productWithImage;  // Return the product with image URL
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch product by ID');
    } finally {
      setLoading(false);
    }
    return null;
  }, [formatImageUrl]);

  const contextValue = useMemo(
    () => ({
      products,
      product,
      loading,
      error,
      getProducts,
      getProductsByCategoryId,
      setProducts,
      getProductById,
    }),
    [products, loading, error, getProducts, getProductsByCategoryId, product, getProductById]
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};
