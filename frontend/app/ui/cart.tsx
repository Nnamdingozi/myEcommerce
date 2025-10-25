'use client';

import { NewCart} from '../lib/definition';
import Image from 'next/image';
import Link from 'next/link';

// --- Import shadcn/ui components and lucide-react icons ---
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2 } from 'lucide-react';

// A simple utility to format currency
const formatCurrency = (amount: number | string) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(Number(amount));
};

// --- Define the component's props ---
interface MyCartProps {
  cartItems: NewCart[];
  onQuantityChange: (itemId: number, newQuantity: number) => void;
  onRemoveItem: (itemId: number) => void;
  subtotal: number;
}

export const MyCart: React.FC<MyCartProps> = ({
  cartItems,
  onQuantityChange,
  onRemoveItem,
  subtotal,
}) => {
  const assetBaseUrl = process.env.NEXT_PUBLIC_ASSET_BASE_URL;

  return (
    <div className="container mx-auto px-4 py-8 pt-24 md:pt-32">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Your Shopping Cart</h1>
        <Button asChild variant="outline">
          <Link href="/orders">View Order History</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* --- Left Column: Cart Items --- */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => {
            //  Access the nested `product` object
            const { product } = item; 
            const imageSrc = product.imageUrl ? `${assetBaseUrl}${product.imageUrl}` : '/images/img-1.jpg';

            return (
              <Card key={item.id} className="flex items-center p-4">
                <div className="relative w-24 h-24 rounded-md overflow-hidden border">
                  <Image src={imageSrc} alt={product.name} fill className="object-cover" />
                </div>
                <div className="flex-grow ml-4">
                  <h2 className="font-semibold">{product.name}</h2>
                  <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
                  <p className="text-sm font-medium mt-1">{formatCurrency(product.price)}</p>
                </div>
                <div className="flex items-center gap-2 mx-4">
                
                  <Button
                    variant="outline" size="icon" className="h-8 w-8"
                    onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-10 text-center font-bold">{item.quantity}</span>
                  <Button
                    variant="outline" size="icon" className="h-8 w-8"
                    onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatCurrency(Number(product.price) * item.quantity)}</p>
                 
                  <Button
                    variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove item</span>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* --- Right Column: Cart Summary --- */}
        <div className="lg:col-span-1 sticky top-24">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
               
                <span className="font-semibold">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-semibold">Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxes</span>
                <span className="font-semibold">Calculated at checkout</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Estimated Total</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
            </CardContent>
            <CardFooter className='flex flex-col gap-2'>
                <Button size="lg" className="w-full" asChild>
                    <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
                <Button size="lg" className="w-full" asChild>
                    <Link href="/">Continue Shopping</Link>
                </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};