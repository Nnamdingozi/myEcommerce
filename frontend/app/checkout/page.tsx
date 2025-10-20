// app/checkout/page.tsx
'use client';

import OrderForm from '@/app/ui/orderForm'; // We will rename the component
import { useCart } from '@/app/context/cartContext';
import { useUser } from '@/app/context/userContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CheckoutPage() {
  const { cart } = useCart();
  const { user, isLoading } = useUser();
  const router = useRouter();

  // This effect protects the route
  useEffect(() => {
    
    if (!isLoading && !user) {
      router.replace('/user/login?redirect=/checkout');
    }
    // If the cart is empty, redirect to the cart page (which will show an empty message)
    if (!isLoading && cart.length === 0) {
      router.replace('/cart');
    }
  }, [user, isLoading, cart, router]);

  // Show a loading state while we verify the user and cart
  if (isLoading || !user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto max-w-2xl py-12 pt-24">
      <OrderForm />
    </div>
  );
}