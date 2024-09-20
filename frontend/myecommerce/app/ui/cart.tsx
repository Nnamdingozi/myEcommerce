'use client'

import { Cart } from '@/app/lib/definition';
import { fetchUserCart, addToCart, updateCartItem } from '@/app/lib/data'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface CartProps {
    id: number;
    name: string;
    quantity: number;
    price: number;
    description: string;
    image_url: string;
    total: number;

}
interface UserCart {
    userId: number;
}


const CartItems: React.FC<UserCart> = ({ userId }) => {
    const [cartItems, setCartItems] = useState<CartProps[]>([]);
    useEffect(() => {
        const getCartItems = async () => {
            try {
                const items = await fetchUserCart(userId);
                if (items) {
                    setCartItems(items);
                }

            } catch (err) {
console.error(' Error loading cart items', err)
            }
        };
        getCartItems();
    }, [userId]);


    

    const newQuantity = async(cartItemId: number, quantity: number) => {
        try {
            const existingItem = cartItems.find((cartItem) => cartItem.id === cartItemId)
    if(existingItem){
         await updateCartItem(cartItemId, quantity)
    setCartItems((prev) => prev.map((cartItem) => cartItem.id === cartItemId ? {...cartItem, quantity}: cartItem))
    } else {
        console.log('Item not found in cart')
    }
        } catch (err) {
            console.error(' Error adding item to cart', err)
                        }
    }

    return (
        <div>
            {cartItems.length === 0 ? <p>Cart is empty</p>: (
<div>
    {cartItems.map((item) => (
        <div key={item.id}>
            <Image src={item.image_url} alt='product image' width={100} height={100}/>
            <p>{item.name}</p>
            <p>quantity: {item.quantity}</p>
            <p>{item.price}</p>
            <p>{item.total}</p>
            <button onClick={() => newQuantity(item.id, item.quantity - 1)}>-</button>
            <button onClick={() => newQuantity(item.id, item.quantity + 1)}>+</button>
        </div>
    ))}
</div>
            )}
        </div>
    )

};

export const addItemsToCart = async(
    item: CartProps,
    userId: number,
    setCartItems: React.Dispatch<React.SetStateAction<CartProps[]>>
    ):Promise<void> => {

    try {

        const pdt: CartProps | undefined = await addToCart(userId, item);
        if(pdt) {
            setCartItems((prev: CartProps[]) => {
                const existingIndex= prev.findIndex((cartItems => cartItems.id === pdt.id));
                if(existingIndex !== -1) {
                    const addedPdt = [...prev]
                    addedPdt[existingIndex].quantity = pdt.quantity
                return addedPdt
                } else {
                    return [...prev, pdt]
                }
            })
        }
    } catch (err) {
        console.error(' Error adding item to cart', err)
                    }
}

export default CartItems

