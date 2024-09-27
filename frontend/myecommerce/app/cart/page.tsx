'use client'

import { NewCart, ProductDetails } from '@/app/lib/definition';
import CartItems from '@/app/ui/cart';
import { useUser } from '@/app/context/userContext';
import { fetchUserCart, updateCartItem } from '@/app/lib/data';

import React, { useEffect, useState } from 'react';

interface CartItemsProps {
    cartItems: NewCart[]; // Expecting cartItems array
    newQuantity: (cartItemId: number, quantity: number) => Promise<void>; // Function to update quantity
}

const CartPage = async () => {


    const { user } = useUser();
    const id = user?.id
    // const userIdNumber = Number(id) | null;

    const [cartItems, setCartItems] = useState<NewCart[]>([]);
    useEffect(() => {
        const getCartItems = async () => {
            if (id) {
                try {
                    const items = await fetchUserCart();
                    if (items) {
                        setCartItems(items);
                    }

                } catch (err) {
                    console.error(' Error loading cart items', err)
                }
            }
        };
        getCartItems();
    }, [id]);




    
   
    return (
        <div>  
            <CartItems  cartItems={cartItems} newQuantity={newQuantity}/>
        </div>
    )

};


export default CartPage;