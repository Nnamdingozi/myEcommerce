
'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
// --- Import our official types and API functions ---
import { PaystackInitResponse, VerifyTransactionResponse } from '../lib/definition';
import { initializePaystack, verifyPaystack } from '../lib/data/paystack';
import { useUser } from './userContext'; // To ensure a user is logged in

interface PaystackContextProps {
  isLoading: boolean;
  error: string | null;
  /**
   * Initializes a payment for a specific order and returns the Paystack data.
   * @param orderId The ID of the order to pay for.
   */
  createPaystackPayment: (orderId: number) => Promise<PaystackInitResponse | null>;
  /**
   * Verifies a payment with the backend using the transaction reference.
   * @param reference The Paystack transaction reference.
   */
  verifyPaystackPayment: (reference: string) => Promise<VerifyTransactionResponse | null>;
}

const PaystackContext = createContext<PaystackContextProps | undefined>(undefined);

export const PaystackProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  const createPaystackPayment = useCallback(async (orderId: number): Promise<PaystackInitResponse | null> => {
    if (!user) {
      setError('You must be logged in to make a payment.');
      return null;
    }

    setIsLoading(true);
    setError(null);
    try {
      
      const paystackData = await initializePaystack(orderId);
      return paystackData;
    } catch (err: any) {
      setError(err.message || 'An error occurred while initializing payment.');
    
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const verifyPaystackPayment = useCallback(async (reference: string): Promise<VerifyTransactionResponse | null> => {
    if (!user) {
      setError('You must be logged in to verify a payment.');
      return null;
    }
    
    setIsLoading(true);
    setError(null);
    try {
      const verificationData = await verifyPaystack(reference);
      return verificationData;
    } catch (err: any) {
      setError(err.message || 'An error occurred during payment verification.');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  return (
    <PaystackContext.Provider value={{
      isLoading,
      error,
      createPaystackPayment,
      verifyPaystackPayment,
    }}>
      {children}
    </PaystackContext.Provider>
  );
};

// Custom hook for easy consumption
export const usePaystack = (): PaystackContextProps => {
  const context = useContext(PaystackContext);
  if (!context) {
    throw new Error('usePaystack must be used within a PaystackProvider');
  }
  return context;
};


  