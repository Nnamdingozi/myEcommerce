'use client'
import Link from 'next/link';

const SellHerePage = () => {
    return (
        <div>
            <div className="w-5/6 h-80 flex border-2 mt-11">
                <div className=" w-2/3 border-8 bg-red-800  h-full rounded-lg"></div>
                <div className="w-1/3  bg-rose-200  h-full border-8  rounded-lg font-pacifico flex flex-col justify-center align-middle">
                    <p>Thank you for your interest in <em>Family Shop</em></p>
                    <p><Link href={'/contacts'} className='text-blue-800 underline'>Contact Us</Link> for steps on how to be a merchant on<em>Family Shop</em></p>
                    </div>  
            </div>
        </div>
    )
};

export default SellHerePage
