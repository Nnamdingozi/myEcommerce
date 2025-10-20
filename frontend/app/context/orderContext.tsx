
'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
// --- Import our official types and API functions ---
import { Order, CreateOrderPayload } from '../lib/definition';
import { createOrder, fetchUserOrders, fetchOrderById } from '../lib/data/order';
import { useUser } from './userContext'; // To check for an authenticated user

interface OrderContextProps {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  fetchSingleOrder: (orderId: number) => Promise<Order | null>;
  createNewOrder: (orderData: CreateOrderPayload) => Promise<Order | null>;
}

const OrderContext = createContext<OrderContextProps | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get the user object 
  const { user } = useUser();

  const fetchOrders = useCallback(async () => {

    if (!user) {
      setOrders([]); // Clear any previous user's orders
      return;
    }

    setIsLoading(true);
    setError(null);
    try {

      const userOrders = await fetchUserOrders();
      setOrders(userOrders);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching your orders.');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Fetch all orders when the component mounts or the user changes
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const createNewOrder = useCallback(async (orderData: CreateOrderPayload): Promise<Order | null> => {
    if (!user) {
      throw new Error('You must be logged in to create an order.');
    }

    setIsLoading(true);
    setError(null);
    try {


      const newOrder = await createOrder(orderData);

      setOrders(prevOrders => [newOrder, ...prevOrders]);
      return newOrder;
    } catch (err: any) {
      setError(err.message || 'An error occurred while creating the order.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const fetchSingleOrder = useCallback(async (orderId: number): Promise<Order | null> => {
    if (!user) {
      console.warn('No user logged in. Skipping fetch order by ID request.');
      return null;
    }

    setIsLoading(true);
    setError(null);
    try {
      // API call no longer needs a token
      const fetchedOrder = await fetchOrderById(orderId);

      setOrders(prevOrders => {
        const index = prevOrders.findIndex(o => o.id === fetchedOrder.id);
        if (index > -1) {
          const newOrders = [...prevOrders];
          newOrders[index] = fetchedOrder;
          return newOrders;
        }
        return [...prevOrders, fetchedOrder];
      });

      return fetchedOrder;
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching order details.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  return (
    <OrderContext.Provider value={{
      orders,
      isLoading,
      error,
      fetchOrders,
      fetchSingleOrder,
      createNewOrder,
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = (): OrderContextProps => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};

