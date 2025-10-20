
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/app/lib/definition';
import { useCart } from '@/app/context/cartContext';

// --- Import shadcn/ui components and lucide-react icons ---
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from 'sonner';
import { ShoppingCart, Minus, Plus, Star, ShieldCheck, Truck, Share2, Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { } from 'lucide-react';

// A simple utility to format currency (assuming it's in another file)
const formatCurrency = (amount: number | string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
  }).format(Number(amount));
};

const assetBaseUrl = process.env.NEXT_PUBLIC_ASSET_BASE_URL || 'http://localhost:5000';

interface ItemViewProps {
  product: Product | null;
}

const ItemView: React.FC<ItemViewProps> = ({ product }) => {
  const { upsertToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!product) return;

    setIsAdding(true);
    try {
      await upsertToCart(product.id, quantity);
      toast.success(`${quantity} x ${product.name} added to cart!`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to add item to cart.');
    } finally {
      setIsAdding(false);
    }
  };

  if (!product) {

    return <div className="text-center py-20 text-muted-foreground">Product not found.</div>;
  }

  const imageSrc = product.imageUrl ? `${assetBaseUrl}${product.imageUrl}` : '/images/img-1.jpg';

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 pt-24 md:pt-32">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* --- Left Column: Product Image Gallery --- */}
        <div className="grid gap-4">
          <div className="aspect-square relative overflow-hidden rounded-lg border">
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Placeholder for thumbnail images if you have them */}
          <div className="grid grid-cols-4 gap-4">
            <div className="aspect-square bg-muted rounded-lg animate-pulse" />
            <div className="aspect-square bg-muted rounded-lg animate-pulse" />
            <div className="aspect-square bg-muted rounded-lg animate-pulse" />
            <div className="aspect-square bg-muted rounded-lg animate-pulse" />
          </div>
        </div>

        {/* --- Right Column: Product Details & Actions --- */}
        <div className="flex flex-col gap-6">
          <div className="space-y-3">
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">{product.name}</h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />)}
              </div>
              <span className="text-sm text-muted-foreground">(120 Reviews)</span>
            </div>
            <p className="text-lg text-muted-foreground">{product.description}</p>
          </div>

          <Separator />

          <div className="space-y-4">
            <p className="text-3xl font-bold">{formatCurrency(product.price)}</p>
            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <Label className="text-sm font-medium">Quantity:</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center font-bold text-lg">{quantity}</span>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setQuantity(q => q + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button size="lg" className="w-full" onClick={handleAddToCart} disabled={isAdding}>
              {isAdding ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <ShoppingCart className="mr-2 h-5 w-5" />
              )}
              Add to Cart
            </Button>
          </div>

          <Separator />

          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-green-600" />
              <span>Secure, Encrypted Checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-blue-600" />
              <span>Fast, Reliable Shipping</span>
            </div>
          </div>

          <Separator />

          {/* Additional Info / Trust Badges */}
          <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>Product Details</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Detailed specifications about the material, dimensions, and features would go here.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Shipping & Returns</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Information about your shipping policy, delivery times, and return process.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <Button variant="ghost" size="sm"><Share2 className="mr-2 h-4 w-4" /> Share</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// You might need to add a wrapper for Suspense if you're fetching this data on the client
// but this setup works perfectly for Server Components passing data down.
export default ItemView;

