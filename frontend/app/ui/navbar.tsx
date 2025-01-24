

'use client';

import { HomeIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import { useUser } from '@/app/context/userContext';
import { MagnifyingGlassIcon, ShoppingCartIcon, Cog8ToothIcon } from '@heroicons/react/24/solid';
import { ChatBubbleLeftIcon, UserIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useProduct } from '@/app/context/productContext';
import { ProductDetails } from '../lib/definition';

interface NavBarProps {
  count: number;
}

const Navbar: React.FC<NavBarProps> = ({ count }) => {
  const { user, logout, token } = useUser();
  const { products } = useProduct() as { products: ProductDetails[] }; 
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<ProductDetails[] | []>([]);
  const [loading, setLoading] = useState(false); // Local loading state

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCartClick = () => {
    router.push('/cart');
  };

  // Handle search logic
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts([]);
      setLoading(false); // Stop loading if search query is empty
      return;
    }

    setLoading(true); // Start loading
    const timer = setTimeout(() => {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setFilteredProducts(filtered);
      setLoading(false); // Stop loading after filtering
    }, 500); // Adding a debounce to avoid excessive filtering

    return () => clearTimeout(timer); // Cleanup for debounce
  }, [searchQuery, products]);

  const handleSearchSubmit = () => {
    if (searchQuery.trim() !== '') {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setFilteredProducts([]);
    }
  };

  if(loading) {
    return (
      <div className="absolute top-full left-0 w-full bg-white shadow-lg border border-gray-200 rounded-md mt-1 z-50 flex justify-center items-center py-4">
        <Cog8ToothIcon className="w-6 h-6 text-gray-500 animate-spin" />
      </div>
    )
  }

  return (
    <nav className="bg-rose-100 w-full h-[50px] fixed top-0 flex items-center z-50">
      <div className="flex justify-between items-center h-full w-full p-2">
        {/* Brand and Home Icon */}
        <div className="flex items-center space-x-2 w-[20%]">
          <h2 className="text-red-800 font-pacifico font-bold">Family Shop</h2>
          <Link href={'/'}>
            <HomeIcon className="w-6 h-6 text-red-800" />
          </Link>
        </div>

        {/* Hamburger icon for small screens */}
        <div className="lg:hidden md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-red-800 focus:outline-none">
            <Bars3Icon className="w-6 h-6" />
          </button>
        </div>

        {/* Search bar, User section, and Cart icon for large and medium screens */}
        <div className="hidden md:flex w-full justify-between items-center">
          {/* Search Bar */}
          <div className="relative w-[50%] max-w-sm">
            <input
              type="text"
              placeholder="Search by name or category"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-8 py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-800 focus:outline-none"
            />
           <div className="absolute inset-y-0 right-0 flex items-center pr-3">
  {/* Wrapping the spinner logic in a container */}
  <div >
    <MagnifyingGlassIcon
      className="w-5 h-5 text-gray-500 cursor-pointer"
      onClick={handleSearchSubmit}
    />
  </div>
</div>




            {/* Dropdown for search results */}
            {filteredProducts.length > 0 && !loading && (
              <div className="absolute top-full left-0 w-full bg-white shadow-lg border border-gray-200 rounded-md mt-1 z-50">
                <ul className="divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <li
                      key={product.id}
                      onClick={() => router.push(`/search?query=${encodeURIComponent(product.name)}`)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                    >
                      {product.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            <UserIcon className="h-6 w-6 text-red-800" />
            <span className="text-sm hidden md:inline">
              {token && user && user.username ? (
                <>
                  Welcome, {user.username}{' '}
                  <button
                    className="ml-2 h-6 text-red-800 font-bold px-4 rounded-md hover:border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href={'/user/register'} className='cursor-pointer font-bold hover:text-blue-600 shadow-sm'>Sign up</Link> /{' '}
                  <Link href={'/user/login'} className='cursor-pointer font-bold hover:text-blue-600 shadow-sm '>Log In</Link>
                </>
              )}
            </span>
          </div>

          {/* Contact and Cart */}
          <div className="flex items-center space-x-4">
            <ChatBubbleLeftIcon className="h-6 w-6 text-red-800 cursor-pointer" />
            <span><Link href={'/contacts'} className='cursor-pointer font-bold hover:text-blue-600 shadow-sm'>Contact</Link></span>
            <div className="relative">
              <ShoppingCartIcon className="h-6 w-9 text-red-800 cursor-pointer font-bold hover:text-blue-600 shadow-sm" onClick={handleCartClick} />
              {count > 0 && <span className="absolute top-3 text-black">{count}</span>}
            </div>
          </div>
        </div>

        {/* Dropdown menu for small screens */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-12 right-2 w-64 bg-gray-200 shadow-lg rounded-lg p-4 flex flex-col space-y-4">
            {/* Search Bar in Dropdown */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or category"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-8 py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-800 focus:outline-none"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
              </div>
            </div>

            {/* User Section in Dropdown */}
            <div className="flex items-center space-x-2">
              <UserIcon className="h-6 w-6 text-red-800" />
              <span className="text-sm">
                {token && user && user.username ? (
                  <>
                    Hello, {user.username}{' '}
                    <button
                      className="ml-2 h-6 text-red-800 font-bold px-4 rounded-md hover:border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href={'/user/register'}>Sign up</Link> /{' '}
                    <Link href={'/user/login'}>Log In</Link>
                  </>
                )}
              </span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
