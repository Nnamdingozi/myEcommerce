'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/app/lib/definition';
import { useCart } from '@/app/context/cartContext';

// --- Import UI components, icons, and toast ---
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star } from 'lucide-react';
import { toast } from 'sonner';

// A simple utility to format currency
const formatCurrency = (amount: number | string) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(Number(amount));
};

interface ProductProps {
  products: Product[];
}

const assetBaseUrl = process.env.NEXT_PUBLIC_ASSET_BASE_URL;

const Products: React.FC<ProductProps> = ({ products }) => {
  const { upsertToCart } = useCart();

  const handleAddToCart = async (e: React.MouseEvent, productId: number) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await upsertToCart(productId, 1);
      const product = products.find((p) => p.id === productId);
      toast.success(`${product?.name} added to cart!`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to add item to cart.');
    }
  };


  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 mt-8 md:mt-16">
      {products.map((product) => {
        const imageSrc = product.imageUrl 
          ? `${assetBaseUrl}${product.imageUrl}` 
          : '/images/img-1.jpg';

        return (
          <Link key={product.id} href={`/itemView/${product.id}`} passHref>
            <Card className="group w-full h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="p-0 relative">
                <Image
                  src={imageSrc}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {product.status && (
                  <Badge 
                    className="absolute top-2 right-2"
                    variant={product.status === 'OUT_OF_STOCK' ? 'destructive' : 'default'}
                  >
                    {product.status.replace('_', ' ')}
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="p-4 flex-grow flex flex-col">
                <CardTitle className="text-lg font-semibold leading-tight mb-2 line-clamp-2">{product.name}</CardTitle>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span>4.5 (120 reviews)</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3 flex-grow">{product.description}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex items-center justify-between">
                <p className="text-lg font-bold text-foreground">{formatCurrency(product.price)}</p>
                <Button size="sm" onClick={(e) => handleAddToCart(e, product.id!)}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add
                </Button>
              </CardFooter>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default Products;