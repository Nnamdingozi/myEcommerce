import {  Paystack  } from '@/app/lib/definition';
  import axios from 'axios';
  
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
  console.log(backendUrl);
  
  const configWithToken = (token: string | null) => ({
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
  
  



export async function initializePaystack(orderId: number): Promise<Paystack | null> {
    try {
      const response = await axios.post(`${backendUrl}/checkout/initialize/${orderId}`, {});
      console.log('Paystack payment initialized:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error initializing Paystack payment:', error);
      return null;
    }
  }
  
  
  export async function verifyPaystack(reference: string): Promise<{ status: boolean; message: string; transaction: any } | null> {
    console.log('verifypaystack endpoint hit')
    console.log('reference in verifyPaystack data.ts', reference);
    try {
      // Send request to backend endpoint with reference as a query parameter
      const response = await axios.get(`${backendUrl}/checkout/verify`, {
        params: { reference }
      });
  
      console.log("verify pay value in data.ts:", response.data);
  
      // Ensure response structure aligns with backend
      return {
        status: response.data?.status ?? false, // Fallback to false if undefined
        message: response.data?.message || "No message provided",
        transaction: response.data?.transaction
      };
    } catch (error) {
      console.error("Error verifying Paystack payment:", error);
      return null;
    }
  }