
import { NewCart, ProductDetails } from '../lib/definition';
import Image from 'next/image';

interface MyCartProps {
    cart: NewCart[];
    newQuantity: (id: number, newqty: number) => void;
    removeItemFromCart: (cartItemId: number) => void;

    cartSubTotal: number;

}

export const MyCart: React.FC<MyCartProps> = ({ cart, newQuantity, removeItemFromCart, cartSubTotal }) => {
    const baseUrl = 'http://localhost:5000'

    console.log('cartSubTotal received as props in cart component:', cartSubTotal);


    return (

        <div className=' flex flex-col mt-14 text-rose-800 '>
            {cart.length === 0 ? (
                <div className='h-screen w-full border-2 border-red-700 rounded-lg flex flex-col justify-center items-center'>
                    <p className='text-2xl '>Your cart is empty</p>
                    <p  className='text-2xl '>Log in to view Cart</p>
                </div>
            ) : (
                <>
                    <div className="w-full border-b-2 border-gray-300 pb-4 mb-4 ">
                        <h1 className="text-xl font-bold text-center">My Cart</h1>
                    </div>
<div className='flex justify-around'>
                    <div className='flex flex-col gap-6 bw-[70%]'>
                        {cart.map((item: NewCart, index: number) => {
                            console.log('items id from cart.map: ', item.id)
                            const itemQuantity = item.quantity ?? 1;

                            if (item.id === undefined) {
                                console.error(`Cart item at index ${index} has undefined id`);
                                return null;
                            }

                            return (

                                <div key={index}
                                    className='flex items-center justify-between border-b  pb-4 w-full'
                                >
                                    <div className='flex items-center gap-4 w-full'>
                                        <Image
                                            src={`${baseUrl}${item.cartproduct.image_url}`}
                                            alt={item.cartproduct.name}
                                            height={200}
                                            width={200}
                                            className='rounded-lg'
                                        />

                                        <div className='ml-14'>
                                            <p className='font-semibold text-lg '>{item.cartproduct.name}</p>
                                            <p className='text-red-600'>{item.cartproduct.description}</p>

                                            <p>Quantity: {itemQuantity}</p>

                                            <p className='font-semibold'>Price: {item.cartproduct.price}</p>
                                        </div>
                                        <div className='flex items-center w-[30%]'>

                                            <button
                                                className='h-8 w-8 bg-red-600 text-red-200 rounded-lg flex justify-center items-center'
                                                onClick={() => newQuantity(item.id!, itemQuantity + 1)}
                                            >
                                                +
                                            </button>
                                            <button
                                                className='h-8 w-8 bg-red-600 text-red-200 rounded-lg flex justify-center items-center ml-8'
                                                onClick={() => {
                                                    if (itemQuantity > 1) {
                                                        newQuantity(item.id!, itemQuantity - 1);
                                                    }
                                                }}
                                            >
                                                -
                                            </button>
                                        </div>
                                        <div className="w-[30%] text-right border-2">
                                            <p className="font-semibold">Total: {item.total}</p>
                                        </div>

                                        <button
                                            className='bg-red-600 text-white h-8 px-3 w-48 rounded-lg'
                                            onClick={() => removeItemFromCart(item.id!)}>
                                            Revove Item
                                        </button>

                                    </div>


                                </div>
                            );
                        })}
                    </div>
                    <div className='w-[20%] flex flex-col justify-center items-center'>
                        

                            <h2>Cart Summary</h2>
                            <div>
                                <h2>SubTotal: ${cartSubTotal.toFixed(2)}</h2>
                            </div>

                            <button className='mt-4 bg-red-600 text-white px-4 py-2 rounded-lg'>
                                Checkout ${cartSubTotal.toFixed(2)}
                            </button>

                        </div>
                    
                    </div>
                </>

            )}


        </div>
    );

};
