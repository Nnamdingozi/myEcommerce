'use client'

import { HomeIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import { useUser } from '@/app/context/userContext'
import { MagnifyingGlassIcon, ShoppingCartIcon, } from '@heroicons/react/24/solid';
import { ChatBubbleLeftIcon, UserIcon } from '@heroicons/react/24/outline';


const Navbar: React.FC = () => {
  const { user, logout } = useUser();
  console.log(' Current name: ', user.name);
  if (!user.name) {
    return <div>Loading...</div>;
  }
  return (
    <nav className='bg-rose-100 w-full h-[50px] fixed top-0 flex item-center z-50' >
      <div className='flex justify-between items-center h-[100%]  w-full p-2'>
        <div className='container flex justify-between w-[10%]'>
          <h2 className='text-red-800'>Family Shop</h2> <Link href={'/'}><HomeIcon className="w-6 h-6 text-red-800" /></Link>
        </div>
        <div className="relative w-[50%] max-w-sm top-0">
          <input
            type="text"
            placeholder="Search"
            className="w-full h-8 py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-800 focus:outline-none"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            < MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
          </div>
        </div>

        <div className='w-[40%] flex justify-between item-center '>
          <div className='flex justify-center item-center  w-[50%] border border-black-200'>
            <UserIcon className='h-6 w-6 text-red-800 ' />
            <span className='text-sm'>
              {user ? (
                <>
                  Welcome {user.name? user.name: 'Guest'},  <button className='bg-red-600 text-rose-100 border-2 border-rose-100' onClick={logout}>Logout</button>
                </>) : (
                <>
                  <Link href={'/user/register'}>Sign up</Link> / <Link href={'/user/login'}>Log In</Link>
                </>
              )}
            </span>
          </div>
          <div className='flex justify-center item-baseline space-x-2 w-[30%]'>
            <ChatBubbleLeftIcon className='h-6 w-6 text-red-800' />
            <span>Contact </span>
          </div>
          <div className='flex justify-between item-center w-[20%]'>
            <Link href={'/cart'}> <ShoppingCartIcon className='h-6 w-9 text-red-800' /></Link>
          </div>
        </div>

      </div>

    </nav>
  )
}
export default Navbar;