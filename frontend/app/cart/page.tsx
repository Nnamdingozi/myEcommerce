'use client';

import { useEffect } from 'react';
import { MyCart } from '@/app/ui/cart';
import { useUser } from '@/app/context/userContext';
import { useCart } from '@/app/context/cartContext';

const CartPage: React.FC = (): JSX.Element => {
  const { user } = useUser();
  
  const {
    cart,
    loading,
    error,
    newQuantity,
    removeItemFromCart,
    cartSubTotal,
    deleteMessage,
    fetchCartData
  } = useCart();

  // Fetch cart data only if the user is logged in
  useEffect(() => {
    if (user.id) {
      fetchCartData();
    }
  }, [user.id, fetchCartData]);

  // Handle different cart states
  if (!user.id) {
    return <div className="mt-60 w-full h-36 text-red-600 text-center">Please log in to view cart</div>;
  }

  if (loading) {
    return <div className="mt-60 w-full h-36 text-red-600 text-center">Loading cart ...</div>;
  }

  if (error) {
    return <div className="mt-60 w-full h-36 text-red-600 text-center">Error Loading cart: {error}</div>;
  }

  if (cart.length === 0) {
    return <div className="mt-60 w-full h-36 text-red-600 mx-auto text-center">Cart is empty</div>;
  }

  // Render the cart component
  return (
    <MyCart
      cart={cart}
      newQuantity={newQuantity}
      removeItemFromCart={removeItemFromCart}
      cartSubTotal={cartSubTotal}
      deleteMessage={deleteMessage}
    />
  );
};

export default CartPage;
