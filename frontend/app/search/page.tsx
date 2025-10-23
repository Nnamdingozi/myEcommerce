'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// --- Import our types, contexts, and UI components ---
import { Product } from '@/app/lib/definition';
import { useProduct } from '@/app/context/productContext';
import { useCart } from '@/app/context/cartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star, Frown } from 'lucide-react';

// A simple utility to format currency
const formatCurrency = (amount: number | string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
  }).format(Number(amount));
};

const assetBaseUrl = process.env.NEXT_PUBLIC_ASSET_BASE_URL || 'http://localhost:5000';

const SearchResultsContent: React.FC = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  
  const { products } = useProduct();
  const { upsertToCart } = useCart();

  // Filter products whenever the query or the main product list changes
  useEffect(() => {
    if (query.trim() !== '' && products.length > 0) {
      const lowercasedQuery = query.toLowerCase();
      const results = products.filter(
        (product) =>
          product.name.toLowerCase().includes(lowercasedQuery) ||
          product.description?.toLowerCase().includes(lowercasedQuery)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [query, products]);

  const handleAddToCart = async (e: React.MouseEvent, productId: number) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await upsertToCart(productId, 1);
      const product = searchResults.find((p) => p.id === productId);
      setFeedbackMessage({ type: 'success', message: `${product?.name} added to cart!` });
    } catch (error: any) {
      setFeedbackMessage({ type: 'error', message: error.message || 'Failed to add item.' });
    } finally {
      setTimeout(() => setFeedbackMessage(null), 3000);
    }
  };

  return (
    <div className="container py-12 mt-16">
      <h1 className="text-xl font-bold tracking-tight mb-8">
        Search Results for: <span className="text-primary">{query}</span>
      </h1>

      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchResults.map((product) => {
      
            const imageSrc = product.imageUrl ? `${assetBaseUrl}${product.imageUrl}` : '/images/default-placeholder.jpg';

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
                    {/* Placeholder for ratings */}
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span>4.5</span>
                    </div>
                
                    <p className="text-sm text-muted-foreground line-clamp-3 flex-grow">{product.description}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex items-center justify-between">
            
                    <p className="text-xl font-bold text-foreground">{formatCurrency(product.price)}</p>
                    <Button size="sm" onClick={(e) => handleAddToCart(e, product.id)}>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center text-center text-muted-foreground py-20">
            <Frown className="w-16 h-16 mb-4 text-gray-400" />
            <h2 className="text-2xl font-semibold">No Products Found</h2>
            <p className="mt-2">We could not find any products matching your search for &quot;{query}&quot;.</p>
        </div>
      )}

      {/* Feedback Notification */}
      {feedbackMessage && (
        <div 
          className={`fixed top-24 right-8 px-6 py-3 rounded-lg shadow-xl transition-all duration-300
            ${feedbackMessage.type === 'success' ? 'bg-green-600' : 'bg-red-600'} text-white`}
        >
          {feedbackMessage.message}
        </div>
      )}
    </div>
  );
};

// Use Suspense for client-side hooks like useSearchParams
const SearchResultsPage: React.FC = () => {
    return (
        <Suspense fallback={<div>Loading search results...</div>}>
            <SearchResultsContent />
        </Suspense>
    );
};

export default SearchResultsPage;