'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { createOrder, fetchUserOrder, fetchOrderById } from '../lib/data';
import { Order, Paystack } from '../lib/definition';
import { initializePaystack } from '../lib/data';
import { orderHookLogic } from '@/app/lib/hooks/orderHook';
import { useRouter } from 'next/navigation';



interface OrderContextProps {
    order: Order | null;
    userOrder: Order[] | null;
    isLoading: boolean;
    error: string | null;
    setError: (error: string | null) => void;
    createNewOrder: (paymentMtd: string, shippingAddy: string, shippingMtd: string, curr: string) => Promise<{ orderId: number } | null>;
    getUserOrder: () => Promise<Order[] | null>;
    getUserOrderById: (orderId: number) => Promise<Order | null>;
    createPaystack: (orderId: number) => Promise<Paystack | null>;
    successMessage: string | null;
    setSuccessMessage: (message: string | null) => void
    showOrderDetails: boolean;
    setShowOrderDetails: (show: boolean) => void;
    setIsLoading: (show: boolean) => void;
    handleCloseOrderDetails: () => void;
}


const OrderContext = createContext<OrderContextProps | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [order, setOrder] = useState<Order | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [userOrder, setUserOrder] = useState<Order[] | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [showOrderDetails, setShowOrderDetails] = useState(false);

    const router = useRouter()
    const { createNewOrderHook, getUserOrderHook, getUserOrderByIdHook, createPaystackHook } = orderHookLogic(
        setOrder,
        setUserOrder,
        setIsLoading,
        setError,
        setSuccessMessage,
        setShowOrderDetails
    )


    const createNewOrder = useCallback(
        async (paymentMtd: string, shippingAddy: string, shippingMtd: string, curr: string): Promise<{ orderId: number } | null> => {
            setIsLoading(true);
            setError(null);

            try {
                const newOrder = await createNewOrderHook(paymentMtd, shippingAddy, shippingMtd, curr);
                if (newOrder && newOrder.orderId) {
                    return { orderId: newOrder.orderId }; // Ensure we return an object with orderId
                } else {
                    throw new Error('Failed to retrieve order ID');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred while creating the order');
                return null;
            } finally {
                setIsLoading(false);
            }
        },
        [createNewOrderHook]
    );


    const getUserOrder = useCallback(
        async (): Promise<Order[] | null> => {
            setIsLoading(true);
            setError(null);

            try {
                const userOrders = await getUserOrderHook(); // Wait for getUserOrderHook to complete
                return userOrders;
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An error occurred while fetching user orders');
                return null; // Return null in case of an error to match the return type
            } finally {
                setIsLoading(false); // Reset loading state
            }
        },
        [getUserOrderHook]
    );

    const getUserOrderById = useCallback(
        async (orderId: number): Promise<Order | null> => {
            setIsLoading(true);
            setError(null);

            try {
                const userOrder = await getUserOrderByIdHook(orderId); // Wait for getUserOrderHook to complete
                return userOrder;
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An error occurred while initializing paystack in order context');
                return null
            } finally {
                setIsLoading(false);
            }
        },
        [getUserOrderByIdHook]
    );

    const createPaystack = useCallback(
        async (orderId: number): Promise<Paystack | null> => {
            setIsLoading(true);
            setError(null);
            try {
                console.log('order id in createPaystack context:', orderId)
                const initialPay = await createPaystackHook(orderId);
                console.log('initialPay value in context:', initialPay)
                    return initialPay
        

            } catch (error) {

                setError(error instanceof Error ? error.message : 'An error occurred while fetching the order by ID');
                return null; // Return null in case of an error to match the return type
            } finally {
                setIsLoading(false); // Reset loading state
            }

        }, [createPaystackHook]);


    const handleCloseOrderDetails = useCallback(() => {
        setShowOrderDetails(false);
        router.push('/')
    }, []);



    return (
        <OrderContext.Provider value={{ order, isLoading, error, successMessage, createNewOrder, userOrder, getUserOrder, getUserOrderById, setError, createPaystack, handleCloseOrderDetails, showOrderDetails, setShowOrderDetails, setSuccessMessage, setIsLoading }}>
            {children}
        </OrderContext.Provider>
    );
}


export const useOrderContext = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrderContext must be used within an OrderProvider');
    }
    return context;
};


