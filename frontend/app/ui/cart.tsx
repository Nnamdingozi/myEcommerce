

'use client';
import { NewCart } from '../lib/definition';
import Image from 'next/image';
import OrderForm from './order';
import { useState} from 'react';
import { useRouter } from 'next/navigation';

interface MyCartProps {
    cart: NewCart[];
    newQuantity: (id: number, newqty: number) => void;
    removeItemFromCart: (cartItemId: number) => void;
    cartSubTotal: number;
    deleteMessage: string | null;
}

export const MyCart: React.FC<MyCartProps> = ({
    cart,
    newQuantity,
    removeItemFromCart,
    cartSubTotal,
    deleteMessage,
}) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const router = useRouter();
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;


    

    // This function will handle the removal and show delete message
    const handleRemoveItem = (itemId: number) => {
    
            removeItemFromCart(itemId); // Call the removeItem function

        
    };

    const handleClick = () => {
        router.push('/orderPages/orderDisplay');
    };

    return (
        <div className="flex flex-col mt-14 text-rose-800 relative px-4 md:px-10 h-auto">
            <button
                className="absolute top-2 right-10 h-8 border-2 border-red-500 text-red-600 px-4 rounded-lg hover:bg-rose-100 hover:text-red-800 focus:outline-none"
                onClick={handleClick}
            >
                View Orders
            </button>

            {isCheckout && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="relative bg-white p-8 rounded-lg shadow-lg">
                        <OrderForm />
                        <button
                            className="absolute top-3 right-3 text-red-800 hover:text-rose-400 text-2xl"
                            onClick={() => setIsCheckout(false)}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}

            <div className="w-full border-b-2 border-gray-300 pb-4 mb-4">
                <h1 className="text-2xl font-bold text-center">My Cart</h1>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col gap-4 md:w-3/4">
                    {cart.map((item, index) => {
                        if (item.id === undefined) {
                            console.error(`Cart item at index ${index} has undefined id`);
                            return null;
                        }

                        const itemQuantity = item.quantity ?? 1;
                        if (item === undefined) {
                            return null;
                        }

                        return (
                            <div
                                key={item.id}
                                className="flex items-center border border-gray-300 rounded-lg p-4 shadow-lg bg-white h-64 mb-7"
                            >
                                <Image
                                    src={`${baseUrl}${item.cartproduct.image_url}`}
                                    alt={item.cartproduct.name}
                                    height={200}
                                    width={200}
                                    className="rounded-lg"
                                />
                                <div className="flex flex-col ml-4 w-full">
                                    <h2 className="text-lg font-semibold">{item!.cartproduct.name}</h2>
                                    <p className="text-sm text-gray-600">{item!.cartproduct.description}</p>
                                    <p className="text-lg font-semibold text-green-600 mt-1">
                                        Price: ${Number(item.cartproduct.price).toFixed(2)}
                                    </p>

                                    <div className="flex items-center mt-3">
                                        <button
                                            className="h-8 w-8 border border-red-500 text-red-500 rounded-full flex justify-center items-center"
                                            onClick={() => newQuantity(item.id!, itemQuantity + 1)}
                                        >
                                            +
                                        </button>
                                        <span className="mx-3">{itemQuantity}</span>
                                        <button
                                            className="h-8 w-8 border border-red-500 text-red-500 rounded-full flex justify-center items-center"
                                            onClick={() => itemQuantity > 1 && newQuantity(item.id!, itemQuantity - 1)}
                                        >
                                            -
                                        </button>
                                    </div>
                                </div>
                                <div className="ml-auto text-right">
                                    <p className="font-semibold">Total: ${Number(item.total).toFixed(2)}</p>
                                    <button
                                        className="mt-4 bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600"
                                        onClick={() => handleRemoveItem(item.id!)} // Use handleRemoveItem on button click
                                    >
                                        Remove
                                    </button>
                                </div>

                                {deleteMessage && (
                                    <div className="fixed top-32 right-32 bg-green-700 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300">
                                        {deleteMessage} {/* Display delete message from context */}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="md:w-1/4 bg-white p-6 shadow-lg rounded-lg border border-gray-300 h-64">
                    <h2 className="text-xl font-bold text-center mb-4">Cart Summary</h2>
                    <p className="text-lg font-semibold">Subtotal: ${cartSubTotal.toFixed(2)}</p>
                    <button
                        className="mt-12 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                        onClick={() => setIsCheckout(true)}
                    >
                        Checkout - ${cartSubTotal.toFixed(2)}
                    </button>
                </div>
            </div>
        </div>
    );
};
