// app/orders/success/[id]/page.tsx
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useParams } from 'next/navigation';
import { useOrder } from '@/app/context/orderContext';
import { Order } from '@/app/lib/definition';

// --- Import UI Components ---
import OrderConfirmationDisplay from '@/app/ui/orderComfirmation';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorCard } from '@/app/ui/errorCard';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

// A simple skeleton for the confirmation page
const ConfirmationSkeleton = () => (
  <div className="container mx-auto max-w-2xl py-12 pt-24">
    <Card className="animate-pulse">
      <CardHeader>
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2 mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </CardContent>
    </Card>
  </div>
);

const OrderConfirmationContent = () => {
  const params = useParams();
  const orderId = params.id ? Number(params.id) : null;

  const { fetchSingleOrder, isLoading, error } = useOrder();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (orderId) {
      const loadOrder = async () => {
        try {
          const fetchedOrder = await fetchSingleOrder(orderId);
          setOrder(fetchedOrder);
        } catch (err) {
          // The context will also set its own error, but we can be explicit
          console.error("Failed to fetch order for confirmation page:", err);
        }
      };
      loadOrder();
    }
  }, [orderId, fetchSingleOrder]);

  // --- Handle Loading State ---
  if (isLoading || (!order && !error)) {
    return <ConfirmationSkeleton />;
  }

  // --- Handle Error State ---
  if (error || !order) {
    return <ErrorCard errorMessage={error || 'Could not find the specified order.'} title="Order Not Found" />;
  }

  // --- Success State ---
  return <OrderConfirmationDisplay order={order} />;
};

// Main page component wraps the logic in Suspense
export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<ConfirmationSkeleton />}>
      <OrderConfirmationContent />
    </Suspense>
  );
}