'use client'

import { useEffect, useState } from 'react';
import Hero from '@/app/ui/hero';
import Products from '@/app/ui/products';
import { fetchProducts } from '@/app/lib/data';
import { Product } from '@/app/lib/definition';
import { useRouter } from "next/navigation";
import { CartProvider } from '../context/cartContext';




export default  function Home() {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
   const router = useRouter();

   
 useEffect(() => {
  const baseUrl = 'http://localhost:5000';

  const fetchData = async () => {
    try {
      const GetProducts: Product[] = await fetchProducts();

      const modifiedProducts = GetProducts.map(product => ({
        ...product,
        image_url: `${baseUrl}${product.image_url}`
      }));
      setProducts(modifiedProducts);
      console.log('products from fetchProducts call:', products)
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false)
    }
  } 
  fetchData()
 }, []);
 

 if (loading) return <p>Loading products...</p>;
 if (error) return <p>{error}</p>;
 
 if (!products || products.length === 0) {
    return <p className=''>No products found</p>;
  };

  // useEffect (() => {
  //   const handleAddToCart = async (productId: number, quantity: number) => {
  //     try {
  //     const addedItem = await addItemsToCart(productId, quantity);
  //     if(addedItem) {
  //      console.log('items successfully added to cart');
  //     } 
  //     } catch (err) {
  //       console.error('Unable to add item to cart', err)

  //     }
    
  //     };
  //     if(productId && quantity) {
  //       handleAddToCart(productId, quantity)
  //     }

  // }[productId])


  // const handleAddToCart = async (productId: number, quantity: number) => {
  //   try {
  //     const addedItem = await addItemsToCart(productId, quantity);
  //     if (addedItem) {
  //       console.log('Item successfully added to cart');
       
  //     }
  //   } catch (err) {
  //     console.error('Unable to add item to cart', err);
  
  //   }
  // };

  
  

  
      // const productDetails: ProductDetails = {
      //   id: product.id,
      //   name: product.name,
      //   price: product.price,
      //   description: product.description,
      //   image_url: product.imageUrl

      // }
      // await addItemsToCart(product.id, setCartItems)

    
    
  

  return (
    <div>
 <Hero />
 <CartProvider>
 <Products products={products} />
 </CartProvider>
  
    </div>

    
  );
};
