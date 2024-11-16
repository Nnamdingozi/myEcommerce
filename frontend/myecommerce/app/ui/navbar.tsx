// 'use client'

// import { HomeIcon } from '@heroicons/react/16/solid';
// import Link from 'next/link';
// import { useUser } from '@/app/context/userContext';
// import { MagnifyingGlassIcon, ShoppingCartIcon, } from '@heroicons/react/24/solid';
// import { ChatBubbleLeftIcon, UserIcon } from '@heroicons/react/24/outline';
// import {useRouter}  from 'next/navigation';
// import { useCart } from '@/app/context/cartContext'
// import { useEffect, useState } from 'react';
// import { Pacifico } from 'next/font/google';





// interface NavBarProps {
// count: number;

// }


// const Navbar: React.FC <NavBarProps> =({ count}) => {
//   const { user, logout } = useUser();

//   console.log('count value in navbar component:', count);
  

  
//   const router = useRouter();


//     const handleCartClick = () => {
// router.push('/cart/[id]')
//       };

     
     
 
  
//   return (
//     <nav className='bg-rose-100 w-full h-[50px] fixed top-0 flex items-center z-50' >
//       <div className='flex justify-between items-center h-[100%]  w-full p-2'>
//         <div className='container flex justify-between w-[10%]'>
//           <h2 className='text-red-800 font-pacifico font-bold'>Family Shop</h2> <Link href={'/'}><HomeIcon className="w-6 h-6 text-red-800" /></Link>
//         </div>
//         <div className="relative w-[50%] max-w-sm top-0">
//           <input
//             type="text"
//             placeholder="Search"
//             className="w-full h-8 py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-800 focus:outline-none"
//           />
//           <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//             < MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
//           </div>
//         </div>

//         <div className='w-[40%] flex justify-between items-center '>
//           <div className='flex justify-center items-center  w-[50%] border border-black-200'>
//             <UserIcon className='h-6 w-6 text-red-800 ' />
//             <span className='text-sm'>
//               {user && user.username? (
//                 <>
//                   Welcome {user.username},  <button className="ml-2 h-6 text-cente text-red-800 font-bold py-auto px-4 rounded-md hover:border-1 border-red-500 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
//                   onClick={logout}>Logout</button>
//                 </>
//                 ) : (
//                 <>
//                   <Link href={'/user/register'}>Sign up</Link> / <Link href={'/user/login'}>Log In</Link>
//                 </>
//               )}
//             </span>
//           </div>
//           <div className='flex justify-center items-baseline space-x-2 w-[30%]'>
//             <ChatBubbleLeftIcon className='h-6 w-6 text-red-800 cursor-pointer' />
//             <span>Contact </span>
//           </div>
//           <div className='flex justify-between items-center w-[20%] relative'>
//              <ShoppingCartIcon className='h-6 w-9 text-red-800 cursor-pointer' onClick={handleCartClick} />
//              {count > 0 && <span className='absolute top-3 text-black'>{count}</span>}
//           </div>
//         </div>

//       </div>

//     </nav>
//   )
// }
// export default Navbar;



// 





'use client';

import { HomeIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import { useUser } from '@/app/context/userContext';
import { MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { ChatBubbleLeftIcon, UserIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface NavBarProps {
  count: number;
}

const Navbar: React.FC<NavBarProps> = ({ count }) => {
  const { user, logout, token } = useUser();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCartClick = () => {
    router.push('/cart');
  };

  return (
    <nav className='bg-rose-100 w-full h-[50px] fixed top-0 flex items-center z-50'>
      <div className='flex justify-between items-center h-full w-full p-2'>
        {/* Brand and Home Icon */}
        <div className='flex items-center space-x-2 w-[20%]'>
          <h2 className='text-red-800 font-pacifico font-bold'>Family Shop</h2>
          <Link href={'/'}>
            <HomeIcon className='w-6 h-6  text-red-800' />
          </Link>
        </div>

        {/* Hamburger icon for small screens */}
        <div className='lg:hidden md:hidden flex items-center'>
          <button onClick={toggleMenu} className='text-red-800 focus:outline-none'>
            <Bars3Icon className='w-6 h-6' />
          </button>
        </div>

        {/* Search bar, User section, and Cart icon for large and medium screens */}
        <div className='hidden md:flex w-full justify-between items-center'>
          {/* Search Bar */}
          <div className='relative w-[50%] max-w-sm'>
            <input
              type='text'
              placeholder='Search'
              className='w-full h-8 py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-800 focus:outline-none'
            />
            <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
              <MagnifyingGlassIcon className='w-5 h-5 text-gray-500' />
            </div>
          </div>

          {/* User Section */}
          <div className='flex items-center space-x-4'>
            <UserIcon className='h-6 w-6 text-red-800' />
            <span className='text-sm hidden md:inline'>
              {token && user && user.username ? (
                <>
                  Welcome, {user.username}{' '}
                  <button
                    className='ml-2 h-6 text-red-800 font-bold px-4 rounded-md hover:border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500'
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

          {/* Contact and Cart */}
          <div className='flex items-center space-x-4'>
            <ChatBubbleLeftIcon className='h-6 w-6 text-red-800 cursor-pointer' />
            <span>Contact</span>
            <div className='relative'>
              <ShoppingCartIcon className='h-6 w-9 text-red-800 cursor-pointer' onClick={handleCartClick} />
              {count > 0 && <span className='absolute top-3 text-black'>{count}</span>}
            </div>
          </div>
        </div>

        {/* Dropdown menu for small screens */}
        {isMenuOpen && (
          <div className='lg:hidden absolute top-12 right-2 w-64 bg-gray-200 shadow-lg rounded-lg p-4 flex flex-col space-y-4'>
            {/* Search Bar in Dropdown */}
            <div className='relative'>
              <input
                type='text'
                placeholder='Search'
                className='w-full h-8 py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-800 focus:outline-none'
              />
              <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                <MagnifyingGlassIcon className='w-5 h-5 text-gray-500' />
              </div>
            </div>

            {/* User Section in Dropdown */}
            <div className='flex items-center space-x-2'>
              <UserIcon className='h-6 w-6 text-red-800' />
              <span className='text-sm'>
                {token && user && user.username ? (
                  <>
                    Hello, {user.username}{' '}
                    <button
                      className='ml-2 h-6 text-red-800 font-bold px-4 rounded-md hover:border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500'
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

            {/* Contact and Cart in Dropdown */}
            <div className='flex items-center space-x-4'>
              <ChatBubbleLeftIcon className='h-6 w-6 text-red-800 cursor-pointer' />
              <span>Contact</span>
            </div>
            <div className='relative flex items-center space-x-2'>
              <ShoppingCartIcon className='h-6 w-9 text-red-800 cursor-pointer' onClick={handleCartClick} />
              {count > 0 && <span className='absolute top-3 text-black'>{count}</span>}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
