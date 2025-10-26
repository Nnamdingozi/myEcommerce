// app/orders/success/[id]/page.tsx
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useParams } from 'next/navigation';
import { useOrder } from '@/app/context/orderContext';
import { Order } from '@/app/lib/definition';
import { useRouter } from 'next/navigation';

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
  
  const { mostRecentOrder, isLoading, error } = useOrder();
const router = useRouter()

  useEffect(() => {
    if (!isLoading && !mostRecentOrder) {
      // Redirect to the home page after a short delay
      const timer = setTimeout(() => router.replace('/'), 3000);
      return () => clearTimeout(timer);
    }
  }, [mostRecentOrder, router, isLoading]);

  // --- Handle Loading State ---
  if (isLoading || (!mostRecentOrder && !error)) {
    return <ConfirmationSkeleton />;
  }

  // --- Handle Error State ---
  if (error || !mostRecentOrder) {
    return <ErrorCard errorMessage={error || 'Could not find the specified order.'} title="Order Not Found" />;
  }

  // --- Success State ---
  return <OrderConfirmationDisplay order={mostRecentOrder} />;
};

// Main page component wraps the logic in Suspense
export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<ConfirmationSkeleton />}>
      <OrderConfirmationContent />
    </Suspense>
  );
}