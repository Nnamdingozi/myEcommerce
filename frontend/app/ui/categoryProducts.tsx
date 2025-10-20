'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/app/lib/definition';
import { useCart } from '@/app/context/cartContext';
import { toast } from 'sonner';

// --- Import our professional UI components and icons ---
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star, Frown } from 'lucide-react';

// A simple utility to format currency
const formatCurrency = (amount: number | string) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(Number(amount));
};

interface CategoryProductsProps {
  products: Product[];
  categoryName?: string;
}

const assetBaseUrl = process.env.NEXT_PUBLIC_ASSET_BASE_URL;


const CategoryProducts: React.FC<CategoryProductsProps> = ({ products, categoryName }) => {
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


  if (!products || products.length === 0) {
    return (
      <div className="container flex flex-col items-center justify-center text-center text-muted-foreground min-h-[60vh] pt-28">
        <Frown className="w-20 h-20 mb-6 text-gray-300" />
        <h2 className="text-2xl font-semibold">No Products Found</h2>
        <p className="mt-2 mb-6">There are currently no products in the {categoryName ? `"${categoryName}"` : 'selected'} category.</p>
        <Link href="/products" passHref>
          <Button>Explore Other Products</Button>
        </Link>
      </div>
    );
  }

  // ---  "Success State" ---
  
  return (
    <div className="container mx-auto px-4 py-8">
      {categoryName && (
        <h1 className="text-3xl font-bold tracking-tight mb-8">
          Products in: <span className="text-primary">{categoryName}</span>
        </h1>
      )}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
    </div>
  );
};

export default CategoryProducts;