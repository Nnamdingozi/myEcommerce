'use client'
import Link from 'next/link';
import { Product, Cart } from '@/app/lib/definition';
import Image from 'next/image';
import {addItemsToCart} from '@/app/ui/cart'

interface ProductProps {
  products: Product[];
  userId: number;
  setCartItems:  React.Dispatch<React.SetStateAction<Cart[]>>;
}


const Products: React.FC<ProductProps> = ({ products, userId, setCartItems }) => {
    console.log('products value in props:',  products)
  if (!products || products.length === 0) {
    return <p>No products found</p>;
  };

  const handleAddToCart = async(product: Product) => {
      const cartItem: Cart = {
        id: product.id,
        name: product.name,
        quantity: 1,
        price: product.price,
        description: product.description,
        image_url: product.imageUrl,
        total: product.price * 1
      }
      await addItemsToCart(cartItem, userId, setCartItems)

    };
    

  return (
    <div className='w-full h-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 mt-16'>
      {products.map((product) => (
        <div key={product.id} className='bg-gray-100 shadow-md rounded-lg overflow-hidden border-2 border-red-400 h-[500px] flex flex-col'>
          <Image 
            src={product.imageUrl || '/images/img-1.jpg'}
            alt={product.name}
            className='w-full h-1/2 object-cover'
            width={500}
            height={500}
          />
          <div className='p-4 mx-auto w-full h-[180px] '>
            <h2 className='text-xl font-semibold'>{product.name}</h2>
            <p className='text-gray-600'>{product.description}</p> 
            <p className='text-green-500 font-bold'>${product.price}</p>
          </div>
          <button className='bg-red-800 text-rose-100 w-[60%] mx-auto h-6 rounded-lg hover:bg-rose-100 hover:text-red-800' onClick={() =>handleAddToCart(product)}>Add to Cart</button>
         
        </div>
      ))}
    </div>
  );
};
 
export default Products