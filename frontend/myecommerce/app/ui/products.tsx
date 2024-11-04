'use client'
import Link from 'next/link';
import { Product, ProductDetails, NewCart } from '@/app/lib/definition';
import Image from 'next/image';


import { useEffect } from 'react';

interface ProductProps {
  products: Product[];
  addToCart: (productId: number, quantity?: number) => Promise<NewCart | null | undefined>;
  getUserCart: () => Promise<NewCart[] | undefined>;
}


const Products: React.FC<ProductProps> = ({products, addToCart, getUserCart}) => {
  // const {addToCart, getUserCart} = useCart();

  console.log('add to cart function in product:', addToCart)

  // useEffect(() => {
  //   console.log('Cart items updated:', cart);
  // }, [cart]);

  const handleAddToCart = (productId: number) => {
    getUserCart();
    addToCart(productId);
    getUserCart();
  };
  

  return (
    <div className='w-full  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 mt-16'>
      {products.map((product) => (
        <div key={product.id} className='bg-gray-100 shadow-lg rounded-lg overflow-hidden border-2 border-red-400 h-[400px] flex flex-col'>
          <Image 
            src={product.image_url || '/images/img-1.jpg'}
            alt={product.name}
            className='w-full h-1/2 object-cover rounded-lg'
            width={500}
            height={500}
          
          />
          <div className='p-4 mx-auto w-full h-[40%] flex flex-col mb-3'>
            <h2 className='text-xl font-semibold'>{product.name}</h2>
            <p className='text-gray-600'>{product.description}</p> 
            <p className='text-green-500 font-bold'>${product.price}</p>
           
          </div>
          <button className='bg-red-800 text-rose-100 w-[60%] mb-4 mx-auto h-8 rounded-lg hover:bg-rose-100 hover:text-red-800' onClick={() =>handleAddToCart(product.id)}>Add to Cart</button>
         
        </div>
      ))}
    </div>
  );
};
 
export default Products