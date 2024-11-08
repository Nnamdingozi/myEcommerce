'use client'


import { fetchUserCart } from '@/app/lib/data';
import { NewCart } from '@/app/lib/definition';

import { MyCart } from '@/app/ui/cart';
import { useCart } from '@/app/context/cartContext';
import { useUser } from '@/app/context/userContext';






const CartPage: React.FC = (): JSX.Element => {


    const { cart, loading, error, newQuantity, removeItemFromCart, cartSubTotal } = useCart()
    const { user } = useUser();

if(!user.id) {
  return <div className='mt-60 w-full h-36 text-red-600 text-center'>Please log in to view cart</div>
}


if(loading) {
  return <div className='mt-60 w-full h-36 text-red-600 text-center'>Loading cart ...</div>
} 

if(error) {
  return <div className='mt-60 w-full h-36 text-red-600 text-center'>Error Loading cart: {error}</div>
}

if(cart.length === 0) {
    return <div className='mt-60 w-full h-36 text-red-600 mx-auto text-center'>Cart is empty </div>
}
   
    return (

   
   <MyCart
    cart={cart} 
    newQuantity ={newQuantity} 
    removeItemFromCart = {removeItemFromCart} 
    cartSubTotal= {cartSubTotal}
    />   
    )
};
    
export default CartPage;