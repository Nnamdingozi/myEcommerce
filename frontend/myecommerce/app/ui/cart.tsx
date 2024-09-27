'use client'

import { NewCart } from '@/app/lib/definition';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useCart } from '@/app/context/cartContext';

interface UserCart {
    cartItems: NewCart[];
}


const CartItems: React.FC<UserCart> = () => {
const {cart, newQuantity, getUserCart} = useCart()
useEffect(()=> {
    const fetchCart = async()=>{
        await getUserCart();
    };
    fetchCart();


}, [getUserCart])
    return (
        <div>
            {cart.length === 0 ? <p>Cart is empty</p>: (
<div>
    {cart.map((item) => (
        <div key={item.id}>
            {/* <Image src={item.image_url} alt='product image' width={100} height={100}/> */}
            <p>{item.name}</p>
            <p>quantity: {item.quantity}</p>
            <p>{item.price}</p>
            <p>{item.total}</p>
            <button onClick={() => newQuantity(item.id || 0, (item.quantity|| 0)- 1)}>-</button>
            <button onClick={() => newQuantity(item.id || 0, (item.quantity|| 0)+ 1)}>+</button>
        </div>
    ))}
</div>
            )}
        </div>
    )

};

export default CartItems

