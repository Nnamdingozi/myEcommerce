'use client'
 import Link from 'next/link';

 export default function Footer () {
    return (
<div className="w-[98%] bg-gray-300  text-red-800 shadow-lg flex flex-col lg:flex-row justify-between items-center px-4 h-64 text-lg font-bold mx-auto">
    <div className='hover:text-blue-700 cursor-pointer underline'><Link href={'/contacts'}>Contact us</Link></div>
    <div className='hover:text-blue-700 cursor-pointer underline'><Link href={'/aboutUs'}>About Us</Link></div>
    <div className='hover:text-blue-700 cursor-pointer underline'><Link href={'/sell'}>Sell on Family Shop</Link></div>
</div>
    )
 }