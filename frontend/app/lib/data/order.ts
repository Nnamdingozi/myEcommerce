
import { Order } from '@/app/lib/definition';
import axios from 'axios';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

const configWithToken = (token: string | null) => ({
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
});



export async function createOrder(token: string, paymentMtd: string, shippingAddy: string, shippingMtd: string, curr: string) {
  try {
    const response = await axios.post(`${backendUrl}/order`, { paymentMtd, shippingAddy, shippingMtd, curr }, configWithToken(token));
    return response.data;
  } catch (err: any) {
    console.error('Error creating order:', err.response?.data || err.message || err);
    throw new Error('Failed to create order');
  }
}

export async function fetchUserOrder(token: string): Promise<Order[] | null> {
  try {
    const response = await axios.get(`${backendUrl}/order`, configWithToken(token));
    return response.data;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return null;
  }
}

export async function fetchOrderById(token: string, orderId: number): Promise<Order | null> {
  try {
    const response = await axios.get(`${backendUrl}/order/${orderId}`, configWithToken(token));
    return response.data;
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    return null;
  }
}