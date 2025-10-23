
'use client';

import { Order, OrderItem } from '@/app/lib/definition';
import Image from 'next/image';

// --- Import shadcn/ui components and lucide-react icons ---
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Package, MapPin, Truck, CreditCard } from 'lucide-react';

// --- Helper Functions for Formatting ---
const formatCurrency = (amount: string | number, currency: string) => {
  return new Intl.NumberFormat('en-US', { // Use a locale that fits your audience
    style: 'currency',
    currency: currency || 'NGN',
  }).format(Number(amount));
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// A helper to get a styled badge based on order status
const getStatusBadge = (status: Order['status']) => {
  switch (status) {
    case 'DELIVERED':
      return <Badge variant="success">Delivered</Badge>;
    case 'SHIPPED':
      return <Badge variant="info">Shipped</Badge>;
    case 'PROCESSING':
      return <Badge variant="secondary">Processing</Badge>;
    case 'CANCELLED':
      return <Badge variant="destructive">Cancelled</Badge>;
    case 'PENDING':
    default:
      return <Badge variant="outline">Pending</Badge>;
  }
};


// Define the component props
type UserOrderDisplayProps = {
  userOrders: Order[]; // Use plural for arrays
};

export default function UserOrderDisplay({ userOrders }: UserOrderDisplayProps) {
  if (!userOrders || userOrders.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center text-center text-muted-foreground py-20">
            <Package className="w-16 h-16 mb-4 text-gray-400" />
            <h2 className="text-2xl font-semibold">No Orders Yet</h2>
            <p className="mt-2">It looks like you have not placed any orders. Start shopping to see them here!</p>
        </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 mt-8 mb-4">
      <h1 className="text-3xl font-bold tracking-tight mb-8 text-center">Your Order History</h1>
      <Accordion type="single" collapsible className="w-full space-y-4">
        {userOrders.map((order) => (
          <AccordionItem key={order.id} value={`order-${order.id}`} className="border rounded-lg bg-card">
            <AccordionTrigger className="p-4 hover:no-underline">
              <div className="flex flex-col md:flex-row md:items-center justify-between w-full text-left gap-2 md:gap-4">
                <div className="flex items-center gap-3">
                    <Package className="h-6 w-6 text-primary" />
                    <div>
                        <p className="font-semibold">Order #{order.id}</p>
                        <p className="text-sm text-muted-foreground">Placed on {formatDate(order.orderDate)}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <p className="text-lg font-bold">{formatCurrency(order.totalAmount, order.currency)}</p>
                    {getStatusBadge(order.status)}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 pt-0">
                <Separator className="my-4" />
                
                {/* Order Items */}
                <h4 className="font-semibold mb-2">Items</h4>
                <div className="space-y-4 mb-6">
                    {order.items.map((item: OrderItem) => (
                        <div key={item.id} className="flex items-center gap-4">
                           <div className="relative w-16 h-16 rounded-md overflow-hidden border">
                                <Image src={item.product?.imageUrl || '/images/img-1.jpg'} alt={item.product?.name || 'Product Image'} fill className="object-cover" />
                           </div>
                           <div className="flex-grow">
                                <p className="font-medium">{item.product?.name}</p>
                                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                           </div>
                           <p className="font-medium">{formatCurrency(item.price, order.currency)}</p>
                        </div>
                    ))}
                </div>

                {/* Shipping and Payment Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div className="space-y-2">
                        <h4 className="font-semibold">Shipping Details</h4>
                        <div className="flex items-start gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                            <span>{order.shippingAddress}</span>
                        </div>
                         <div className="flex items-center gap-2 text-muted-foreground">
                            <Truck className="h-4 w-4" />
                            <span>{order.shippingMethod}</span>
                        </div>
                         {order.trackingNumber && (
                             <p className="text-primary font-medium">Tracking: {order.trackingNumber}</p>
                         )}
                    </div>
                     <div className="space-y-2">
                        <h4 className="font-semibold">Payment Details</h4>
                         <div className="flex items-center gap-2 text-muted-foreground">
                            <CreditCard className="h-4 w-4" />
                            <span>{order.paymentMethod}</span>
                        </div>
                         <Badge variant={order.paymentStatus === 'PAID' ? 'success' : 'secondary'}>
                            {order.paymentStatus}
                         </Badge>
                    </div>
                </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

