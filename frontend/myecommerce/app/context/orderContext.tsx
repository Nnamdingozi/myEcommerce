'use client'

import React, { createContext, useContext, useState, useCallback } from 'react';
import { createOrder, fetchUserOrder, fetchOrderById } from '../lib/data';
import { Order } from '../lib/definition';

interface OrderContextProps {
    order: Order | null;
    userOrder: Order[] | null;
    isLoading: boolean;
    error: string | null;
    createNewOrder: (paymentMtd: string, shippingAddy: string, shippingMtd: string, curr: string) => Promise<number>;
    getUserOrder: () => Promise<Order[] | null>;
    getUserOrderById: (orderId: number) => Promise<Order | null>;
}


const OrderContext = createContext<OrderContextProps | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [order, setOrder] = useState<Order | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [userOrder, setUserOrder] = useState<Order[] | null  >(null);

    
    // const mapOrderData = (orders: any[]): Order[] => {
    //     return orders? orders.map(order => ({
    //         ...order,
    //         shippingAddy: order.shipping_address,
    //         totalAmt: order.total_amount,
    //         curr: order.currency,
    //         orderDate: order.order_date,
    //         paymentMtd: order.payment_method,
    //         shippingMthd: order.shipping_method,
    //         trackingNum: order.tracking_number,

    //     })): [];



    const createNewOrder = useCallback(async (paymentMtd: string, shippingAddy: string, shippingMtd: string, curr: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const newOrder = await createOrder(paymentMtd, shippingAddy, shippingMtd, curr)
            setOrder(newOrder);
            return newOrder.id
console.log('new order in orderContext, ', newOrder)


        } catch (error: any) {
            setError(error?.message || 'Failed to create order');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const getUserOrder = useCallback(async (): Promise<Order[] | null> => {
        setIsLoading(true);
        setError(null)
        try {
            const userOrders= await fetchUserOrder();
            setUserOrder(userOrders);
            return userOrder;
        } catch (error: any) {
            setError(error)

        } finally {
            setIsLoading(false);
        }

return null
    }, []);

    const getUserOrderById = useCallback(async (orderId: number): Promise<Order | null> => {
        setIsLoading(true);
        setError(null)
        try {
            const userOrderById = await fetchOrderById(orderId);
            setOrder(userOrderById);
            return userOrderById;
        } catch (error: any) {
            setError(error)

        } finally {
            setIsLoading(false);
        }

return null
    }, [])

    return (
        <OrderContext.Provider value={{ order, isLoading, error, createNewOrder, userOrder, getUserOrder, getUserOrderById}}>
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


