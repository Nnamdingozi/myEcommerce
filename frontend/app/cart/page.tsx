
'use client';

import { useCart } from '../context/cartContext';

// --- Import our professional UI components ---
import { MyCart } from '../ui/cart';
import { ErrorCard } from '../ui/errorCard'; // Our reusable error component
import { Skeleton } from '@/components/ui/skeleton';
import { ShoppingCart, Frown } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// A simple, reusable skeleton for the cart page
const CartPageSkeleton = () => (
  <div className="container mx-auto px-4 py-8 pt-24 md:pt-32">
    <Skeleton className="h-10 w-48 mb-8" />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <Skeleton className="h-32 w-full rounded-lg" />
        <Skeleton className="h-32 w-full rounded-lg" />
      </div>
      <div className="lg:col-span-1">
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    </div>
  </div>
);

const CartPage: React.FC = () => {

  const { cart, isLoading, error, updateQuantity, removeFromCart, cartSubtotal } = useCart();


  // --- 2. Handle Loading State ---
  if (isLoading) {
    return <CartPageSkeleton />;
  }

  // --- 3. Handle Error State ---
  if (error) {
    return <ErrorCard errorMessage={error} title="Could Not Load Cart" />;
  }

  // --- 4. Handle Empty State ---
  if (!cart || cart.length === 0) {
    return (
      <div className="container flex flex-col items-center justify-center text-center text-muted-foreground min-h-[60vh] pt-28">
        <ShoppingCart className="w-20 h-20 mb-6 text-gray-300" />
        <h2 className="text-2xl font-semibold">Your Cart is Empty</h2>
        <p className="mt-2 mb-6">Looks like you have not added anything to your cart yet.</p>
        <Frown className="w-5 h-5 mb-6 text-gray-300"/>
        <Link href="/" passHref>
          <Button>Start Shopping</Button>
        </Link>
      </div>
    );
  }

  // --- 5. Success State: Render the cart display component ---
  return (
    <MyCart
      cartItems={cart}
      onQuantityChange={updateQuantity}
      onRemoveItem={removeFromCart}
      subtotal={cartSubtotal}

    />
  );
};

export default CartPage;