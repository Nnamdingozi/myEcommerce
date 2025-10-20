
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useUser } from '@/app/context/userContext';
import { useCart } from '@/app/context/cartContext';
import { useProduct } from '../context/productContext';
import { Product } from '../lib/definition';

// --- Import shadcn/ui components and lucide-react icons ---
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Home, Search, ShoppingCart, Menu, X, User as UserIcon } from 'lucide-react';
import { lusitana } from '@/app/ui/font';

const Navbar: React.FC = () => {
  const { user, logout } = useUser();
  const { itemCount } = useCart(); // Correctly get the cart item count
  const { products } = useProduct();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  console.log('User object from context:', user)

  // Debounced search effect
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts([]);
      return;
    }
    const timer = setTimeout(() => {
      const filtered = products.filter(
        (product) => product.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered.slice(0, 5)); // Limit results to 5
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, products]);
  
  const handleSearchSelect = (productName: string) => {
    router.push(`/search?query=${encodeURIComponent(productName)}`);
    setSearchQuery('');
    setFilteredProducts([]);
    setIsSearchFocused(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* === Left Section: Brand === */}
        <Link href="/" className="flex items-center gap-2">
          <ShoppingCart className="h-6 w-6 text-primary" /> {/* Use a relevant icon */}
          <span className={`${lusitana.className} text-xl font-bold`}>FamilyShop</span>
        </Link>

        {/* === Center Section: Search (Desktop) === */}
        <div className="relative hidden md:flex flex-1 max-w-lg mx-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
          />
          {isSearchFocused && filteredProducts.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-background shadow-lg border rounded-md mt-2 z-50">
              <ul>
                {filteredProducts.map((product) => (
                  <li
                    key={product.id}
                    onMouseDown={() => handleSearchSelect(product.name)}
                    className="px-4 py-2 hover:bg-accent cursor-pointer"
                  >
                    {product.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* === Right Section: Icons and User Menu (Desktop) === */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push('/cart')}>
            <div className="relative">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {itemCount}
                </span>
              )}
            </div>
            <span className="sr-only">Open Cart</span>
          </Button>
          
          {user && user.username ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/01.png" alt={user.username } />
                    <AvatarFallback>{user.username?.[0]?.toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.username}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/profile')}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/orderPages/orderDisplay')}>My Orders</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className='flex items-center gap-2'>
              <Button variant="ghost" onClick={() => router.push('/user/login')}>Log In</Button>
              <Button className='bg-rose-400 text-gray-200 hover:text-rose-400 hover:bg-gray-200' onClick={() => router.push('/user/register')}>Create Account</Button>
            </div>
          )}
        </div>

        {/* === Mobile Menu Trigger === */}
        <div className="md:hidden flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => router.push('/cart')}>
                <div className="relative">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {itemCount}
                    </span>
                )}
                </div>
            </Button>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-3/4">
                <div className="flex flex-col gap-6 pt-10 text-gray-800">
                <Link href="/" className="font-bold" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                <Link href="/home" className="font-bold" onClick={() => setIsMobileMenuOpen(false)}>All Products</Link>
                <Link href="/contact" className="font-bold" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                {/* Add other mobile links here */}
                </div>
            </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;