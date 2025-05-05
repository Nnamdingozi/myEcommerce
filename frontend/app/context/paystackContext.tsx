

'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Paystack, VerifyTransactionResponse } from '../lib/definition';
import { initializePaystack, verifyPaystack } from '../lib/data/paystack';

interface PaystackContextProps {
  isLoading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  createPaystack: (orderId: number) => Promise<Paystack | null>;
  successMessage: string | null;
  setSuccessMessage: (message: string | null) => void;
  setIsLoading: (show: boolean) => void;
  verifyPayment: (transactionReference: string) => Promise<VerifyTransactionResponse | null | undefined>;
}

const PaystackContext = createContext<PaystackContextProps | null>(null);

export const PaystackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const createPaystack = useCallback(async (orderId: number): Promise<Paystack | null> => {
    if (!orderId) {
      setError('Order ID is required');
      return null;
    }
    setIsLoading(true);
    setError(null);
    try {
      console.log('Order ID in createPaystack context:', orderId);
      const initiatePay = await initializePaystack(orderId);
      console.log('Initial Pay value in context:', initiatePay);
      return initiatePay;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred while initializing Paystack');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);


  


  const verifyPayment = useCallback(
    async (reference: string): Promise<VerifyTransactionResponse | null> => {
      setIsLoading(true);
      // Clear any previous message
      setSuccessMessage(null);
  
      try {
        const verifyPay = await verifyPaystack(reference);
        console.log('verifyPay value:', verifyPay);
        if(verifyPay && verifyPay.message) {
          setSuccessMessage(verifyPay?.message);
        }
        
        return verifyPay;
      } catch (error) {
        const errMessage =
          error instanceof Error
            ? error.message
            : "An error occurred while verifying the payment.";
        setSuccessMessage(errMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [setSuccessMessage]
  );
  

  useEffect(() => {
    if (successMessage) {
      console.log('Success Message:', successMessage);
    }
    if (error) {
      console.error('Error:', error);
    }
  }, [successMessage, error]);

  return (
    <PaystackContext.Provider
      value={{
        isLoading,
        error,
        successMessage,
        setError,
        createPaystack,
        setSuccessMessage,
        setIsLoading,
        verifyPayment
      }}
    >
      {children}
      {/* Render feedback */}
      {isLoading && <p>Loading...</p>}
      {successMessage && <p>{successMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </PaystackContext.Provider>
  );
};

export const usePaystackContext = () => {
  const context = useContext(PaystackContext);
  if (!context) {
    throw new Error('usePaystackContext must be used within a PaystackProvider');
  }
  return context;
};



  