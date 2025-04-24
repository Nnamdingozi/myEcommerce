
'use client'

import { useState } from 'react';
import Image from 'next/image';
import { useUser } from '@/app/context/userContext';
import { useCart } from '@/app/context/cartContext'; 
import { Product } from '@/app/lib/definition';

interface ProductProps {
  products: Product[];
}

const Products: React.FC<ProductProps> = ({ products }) => {
  const [successMessage, setSuccessMessage] = useState('');
  const { token } = useUser();
  const { addToCart, cart } = useCart(); 

  const handleAddToCart = async (productId: number) => {
  
    // Check if the product is already in the cart
    const isProductInCart = cart.some((item) => item.id === productId);
    if (isProductInCart) {
      setSuccessMessage('This product is already in your cart.');
      setTimeout(() => setSuccessMessage(''), 3000);
      return;
    }

    try {

      const addedCartItem = await addToCart(productId); 

      const product = products.find((p) => p.id === productId);
      if (addedCartItem && product) {
        setSuccessMessage(`${product.name} added to cart successfully!`);
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      setSuccessMessage('Failed to add product to cart. Please try again.');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 mt-16">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-gray-50 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-lg overflow-hidden border border-gray-200 h-[420px] flex flex-col"
        >
          <Image
            src={product.image_url || '/images/img-1.jpg'}
            alt={product.name}
            className="w-full h-1/2 object-cover rounded-t-lg"
            width={500}
            height={500}
          />
          <div className="p-4 flex-grow flex flex-col justify-between">
            <div className="flex flex-col items-start mb-4">
              <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
              <p className="text-gray-600 text-sm line-clamp-3">{product.description}</p>
              <p className="text-green-500 font-bold mt-2">${product.price}</p>
            </div>
            <button
              className="bg-red-700 text-white w-full py-2 mt-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
              onClick={() => handleAddToCart(product.id!)}
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

export default Products;
