'use client'
import Link from 'next/link';
import { Product, ProductDetails, NewCart } from '@/app/lib/definition';
import Image from 'next/image';


import { useState } from 'react';

interface ProductProps {
  products: Product[];
  addToCart: (productId: number, quantity?: number) => Promise<NewCart | null | undefined>;
  getUserCart: () => Promise<NewCart[] | undefined>;
}


const Products: React.FC<ProductProps> = ({products, addToCart, getUserCart}) => {
  const [successMessage, setSuccessMessage] = useState('')
  console.log('add to cart function in product:', addToCart)

  // useEffect(() => {
  //   console.log('Cart items updated:', cart);
  // }, [cart]);

  // const handleAddToCart = (productId: number) => {
  //   getUserCart();
  //   addToCart(productId);
  //   getUserCart();
  // };
  

  const handleAddToCart = async (productId: number) => {
    try {
      await addToCart(productId); // Assuming addItemsToCart is your cart function
      const product = products.find(p => p.id === productId);
      if(product) {
        setSuccessMessage(`${product.name} added to cart successfully!`);
      }
     
      // Hide the message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 mt-16'>
  {products.map((product) => (
    <div 
      key={product.id} 
      className='bg-gray-50 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-lg overflow-hidden border border-gray-200 h-[420px] flex flex-col'
    >
      <Image 
        src={product.image_url || '/images/img-1.jpg'}
        alt={product.name}
        className='w-full h-1/2 object-cover rounded-t-lg'
        width={500}
        height={500}
      />
      <div className='p-4 flex-grow flex flex-col justify-between'>
        <div className='flex flex-col items-start mb-4'>
          <h2 className='text-lg font-semibold text-gray-800'>{product.name}</h2>
          <p className='text-gray-600 text-sm line-clamp-3'>{product.description}</p> 
          <p className='text-green-500 font-bold mt-2'>${product.price}</p>
        </div>
        <button 
          className='bg-red-700 text-white w-full py-2 mt-2 rounded-lg hover:bg-red-600 transition-colors duration-200' 
          onClick={() => handleAddToCart(product.id)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  ))}

  {/* Success Message Notification */}
  {successMessage && (
        <div className="fixed top-32 right-16 bg-green-700 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300">
          {successMessage}
        </div>
      )}
  
</div>

  );
};
 
export default Products



