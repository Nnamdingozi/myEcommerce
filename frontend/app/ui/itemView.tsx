
// 'use client'

// import { Product } from '@/app/lib/definition';
// import Image from 'next/image';
// import { useUser } from '../context/userContext';
// import { useCart } from '@/app/context/cartContext';
// import { useState } from 'react';

// interface ProductViewProps {
//   product: Product | null

// }

// const ProductView: React.FC<ProductViewProps> = ({
//   product
// }) => {
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const { token } = useUser();
//   const { cart, addToCart } = useCart();

//   const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

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



//   return (
//     <div className="w-full h-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 mt-16">
//         <div
//           key={product!.id}
//           className="bg-gray-100 shadow-md rounded-lg overflow-hidden border-2 border-red-400 h-[500px] flex flex-col"
//         >
//           <Image
//             src={product!.image_url || '/images/img-1.jpg'}
//             alt={product!.name}
//             className="w-full h-1/2 object-cover"
//             width={500}
//             height={500}
//           />
//           <div className="p-4 mx-auto w-full h-[180px]">
//             <h2 className="text-xl font-semibold">{product!.name}</h2>
//             <p className="text-gray-600">{product!.description}</p>
//             <p className="text-green-500 font-bold">${product!.price}</p>
//           </div>
//           <button
//             className="bg-red-800 text-rose-100 w-[60%] mx-auto h-6 rounded-lg hover:bg-rose-100 hover:text-red-800"
//             onClick={() => handleAddToCart(token!, product!.id!)}
//           >
//             Add to Cart
//           </button>
//         </div>

//       {/* Success Message Notification */}
//       {successMessage && (
//         <div className="fixed top-32 right-16 bg-green-700 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300">
//           {successMessage}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductView;





'use client';

import { Product } from '@/app/lib/definition';
import Image from 'next/image';
import { useUser } from '../context/userContext';
import { useCart } from '@/app/context/cartContext';
import { useState } from 'react';

interface ProductViewProps {
  product: Product | null;
}

const ProductView: React.FC<ProductViewProps> = ({ product }) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { token } = useUser();
  const { cart, addToCart } = useCart();

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  const handleAddToCart = async (token: string, productId: number) => {
    if (!token) {
      setSuccessMessage('Please register or log in to add items to your cart.');
      setTimeout(() => setSuccessMessage(null), 3000);
      return;
    }

    const isProductInCart = cart.some((item) => item.id === productId);
    if (isProductInCart) {
      setSuccessMessage('Product is already in the cart.');
      setTimeout(() => setSuccessMessage(null), 3000);
      return;
    }

    try {
      await addToCart(productId);
      setSuccessMessage('Product added to cart successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      setSuccessMessage('Failed to add product to cart.');
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  if (!product) return <div className="text-center py-10">Product not found</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 pt-28">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto">
          <Image
            src={product.image_url || '/images/img-1.jpg'}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-green-600 font-semibold text-xl mb-6">${product.price}</p>
          </div>

          <button
            className="bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition-all font-semibold"
            onClick={() => handleAddToCart(token!, product.id!)}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-20 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-md animate-bounce">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default ProductView;



