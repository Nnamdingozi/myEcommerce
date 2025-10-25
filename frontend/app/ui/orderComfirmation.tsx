// app/ui/order-confirmation-display.tsx
'use client';

import { Order } from '@/app/lib/definition';
import Link from 'next/link';

// --- Import UI Components ---
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle,  MapPin, Truck, CreditCard } from 'lucide-react';

// --- Helper Functions ---
const formatCurrency = (amount: string | number, currency: string) => {
  return new Intl.NumberFormat('en-NG', {
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

interface OrderConfirmationProps {
  order: Order;
}

const OrderConfirmationDisplay: React.FC<OrderConfirmationProps> = ({ order }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40 px-4 py-12">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center items-center gap-4 p-6">
          <CheckCircle className="h-16 w-16 text-green-500" />
          <div className="space-y-1">
            <CardTitle className="text-3xl">Thank You For Your Order!</CardTitle>
            <CardDescription>
              Your order has been placed successfully and will be delivered soon.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="bg-muted p-4 rounded-lg text-sm">
            <p>
              An order confirmation has been sent to your email. Your order ID is{' '}
              <span className="font-bold text-primary">#{order.id}</span>.
            </p>
          </div>

          <Separator />

          {/* --- Order Summary --- */}
          <div className="grid gap-2">
            <h3 className="font-semibold">Order Summary</h3>
            {order.items.map(item => (
              <div key={item.id} className="flex justify-between items-center text-muted-foreground">
                <span>{item.product?.name} (x{item.quantity})</span>
                <span>{formatCurrency(item.price, order.currency)}</span>
              </div>
            ))}
            <Separator className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{formatCurrency(order.totalAmount, order.currency)}</span>
            </div>
          </div>

          <Separator />

          {/* --- Shipping & Payment Details --- */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold">Shipping To</h3>
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span className="break-words">{order.shippingAddress}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Truck className="h-4 w-4" />
                <span>{order.shippingMethod}</span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Payment Method</h3>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                <span>{order.paymentMethod} ({order.paymentStatus})</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2 p-6">
          <Button className="w-full" asChild>
            <Link href="/orderPages/orderDisplay">View Order History</Link>
          </Button>
          <Button className="w-full" variant="outline" asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrderConfirmationDisplay;