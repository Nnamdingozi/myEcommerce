
'use client';

import { useEffect } from 'react';
import { useOrder } from '@/app/context/orderContext';
import { useUser } from '@/app/context/userContext';
import { useRouter } from 'next/navigation';

// --- Import our professional UI components ---
import UserOrderDisplay from '@/app/ui/orderDisplay'; // Assuming this is the file name
import { ErrorCard } from '@/app/ui/errorCard';
import { Skeleton } from '@/components/ui/skeleton';


// A simple, reusable skeleton for the order history page
const OrderPageSkeleton = () => (
  <div className="container mx-auto max-w-4xl px-4 py-8 pt-24 md:pt-32">
    <Skeleton className="h-10 w-64 mb-8 mx-auto" />
    <div className="space-y-4">
      <Skeleton className="h-24 w-full rounded-lg" />
      <Skeleton className="h-24 w-full rounded-lg" />
      <Skeleton className="h-24 w-full rounded-lg" />
    </div>
  </div>
);

const OrdersPage: React.FC = () => {
  // 1. Get state and actions from our contexts
  const { orders, isLoading, error, fetchOrders } = useOrder();
  const { user, isLoading: isUserLoading } = useUser();
  const router = useRouter();

  // 2. This effect protects the route from unauthenticated users
  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace('/user/login?redirect=/orders');
    }
  }, [user, isUserLoading, router]);

  // 3. This effect triggers the data fetch when the user is available

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user, fetchOrders]);

  // --- 4. Handle Loading States ---
  // Show a skeleton while either the user is being verified or orders are being fetched.
  if (isUserLoading || isLoading) {
    return <OrderPageSkeleton />;
  }

  // --- 5. Handle Error State ---
  if (error) {
    return <ErrorCard errorMessage={error} title="Could Not Load Your Orders" />;
  }

  // --- 6. Success State ---
  return (
    <UserOrderDisplay userOrders={orders} />
  );
};

export default OrdersPage;