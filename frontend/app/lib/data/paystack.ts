
// app/lib/data/paystack.ts

import api from '../axiosApi'; 
import { PaystackInitResponse, VerifyTransactionResponse } from '@/app/lib/definition'; 

/**
 * Initializes a Paystack transaction for a given order.
 * Relies on the HttpOnly session cookie for authentication.
 * @param orderId - The ID of the order to initialize payment for.
 * @returns The Paystack authorization data (authorization_url, reference, etc.).
 */

export async function initializePaystack(orderId: number): Promise<PaystackInitResponse> {
  try {

    const response = await api.post<PaystackInitResponse>(`/checkout/initialize/${orderId}`);
    return response.data;
  } catch (err: any) {
    const errorMessage = err.response?.data?.error || 'Failed to initialize payment. Please try again.';

    throw new Error(errorMessage);
  }
}

/**
 * Verifies a Paystack transaction with your backend.
 * Relies on the HttpOnly session cookie for authentication.
 * @param reference - The transaction reference provided by Paystack.
 * @returns The verified transaction data from the backend.
 */

export async function verifyPaystack(reference: string): Promise<VerifyTransactionResponse> {
  try {

   
        console.log('[STEP 5 - API Service]: Making GET request to /checkout/verify with reference:', reference);
    
    const response = await api.get<VerifyTransactionResponse>('/checkout/verify', {
      params: { reference }
    });
    console.log('[STEP 6 - API Service]: Received response from backend:', response.data);
    return response.data;
  } catch (err: any) {

    const errorMessage = err.response?.data?.error || 'Payment verification failed.';

    
        console.error('[STEP 7 - API Service]: Axios request failed!', err.response?.data || err.message);

    throw new Error(errorMessage);
  }
}