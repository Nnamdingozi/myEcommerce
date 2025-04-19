'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Order } from '../lib/definition';
import { useRouter } from 'next/navigation';
import { useUser } from './userContext';
import { createOrder, fetchUserOrder, fetchOrderById } from '../lib/data/order';

interface OrderContextProps {
    order: Order | null;
    userOrder: Order[] | null;
    isLoading: boolean;
    error: string | null;
    setError: (error: string | null) => void;
    createNewOrder: (paymentMtd: string, shippingAddy: string, shippingMtd: string, curr: string) => Promise<Order| null>;
    getUserOrder: () => Promise<Order[] | null>;
    getUserOrderById: ( orderId: number) => Promise<Order | null>;
    successMessage: string | null;
    setSuccessMessage: (message: string | null) => void;
    showOrderDetails: boolean;
    setShowOrderDetails: (show: boolean) => void;
    setIsLoading: (show: boolean) => void;
    handleCloseOrderDetails: () => void;
}

const OrderContext = createContext<OrderContextProps | null>(null);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [order, setOrder] = useState<Order | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [userOrder, setUserOrder] = useState<Order[] | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [showOrderDetails, setShowOrderDetails] = useState(false);

    const { token } = useUser();
    const router = useRouter();

    const createNewOrder = useCallback(
        async (paymentMtd: string, shippingAddy: string, shippingMtd: string, curr: string): Promise<Order | null> => {
            if (!token) {
                console.warn('No token provided. Skipping create order request.');
                return null;
            }
           
            setIsLoading(true);
            setError(null);

           
            try {
                const newOrder = await createOrder(token, paymentMtd, shippingAddy, shippingMtd, curr);
                if (newOrder ) {
                    setOrder(newOrder)
                    return newOrder
                } else {
                    throw new Error('Failed to create the order');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred while creating the order');
                return null;
            } finally {
                setIsLoading(false);
            }
        },
        [token]
    );

    const getUserOrder = useCallback(
        async (): Promise<Order[] | null> => {
            if (!token) {
                console.warn('No token provided. Skipping fetch user orders request.');
                return null;
            }

            setIsLoading(true);
            setError(null);

            try {
                const userOrders = await fetchUserOrder(token);
                setUserOrder(userOrders);
                return userOrders;
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred while fetching user orders');
                return null;
            } finally {
                setIsLoading(false);
            }
        },
        [token]
    );

    const getUserOrderById = useCallback(
        async (orderId: number): Promise<Order | null> => {
            if (!token) {
                console.warn('No token provided. Skipping fetch order by ID request.');
                return null;
            }

            setIsLoading(true);
            setError(null);

            try {
                const userOrder = await fetchOrderById(token, orderId);
                return userOrder;
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred while fetching order details');
                return null;
            } finally {
                setIsLoading(false);
            }
        },
        [token]
    );

    useEffect(()=> {
        getUserOrder();
       
       }, [getUserOrder]);



    const handleCloseOrderDetails = useCallback(() => {
        setShowOrderDetails(false);
        router.push('/');
    }, [router]);

    return (
        <OrderContext.Provider value={{
            order,
            userOrder,
            isLoading,
            error,
            successMessage,
            createNewOrder,
            getUserOrder,
            getUserOrderById,
            setError,
            handleCloseOrderDetails,
            showOrderDetails,
            setShowOrderDetails,
            setSuccessMessage,
            setIsLoading,
        }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrderContext = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrderContext must be used within an OrderProvider');
    }
    return context;
};
