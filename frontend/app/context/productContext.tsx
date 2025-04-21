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
} from '@/app/lib/data/product';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  getProducts: () => Promise<void>;
  getProductsByCategoryId: (id: number) => Promise<Product[]>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:5000';
 
  const formatImageUrls = useCallback((items: Product[]) => {
    return items.map((product) => ({
      ...product,
      image_url: `${baseUrl}${product.image_url}`,
    }));
  }, [baseUrl]);
  
  const getProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const items = (await fetchProducts()) || [];
      if (items.length) {
        setProducts(formatImageUrls(items));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, [formatImageUrls]);

  const getProductsByCategoryId = useCallback(async (id: number): Promise<Product[]> => {
    setLoading(true);
    setError(null);
    try {
      const items = (await fetchProductsByCategoryId(id)) || [];
      if (items.length) {
        // setProducts(formatImageUrls(items));
        return items
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products by category');
    } finally {
      setLoading(false);
    }
    return []
  }, []);

  const contextValue = useMemo(
    () => ({
      products,
      loading,
      error,
      getProducts,
      getProductsByCategoryId,
      setProducts,
    }),
    [products, loading, error, getProducts, getProductsByCategoryId]
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
