
// app/lib/data/order.ts

import api from '../axiosApi'; 
import { Order, CreateOrderPayload } from '@/app/lib/definition'; 

/**
 * Creates a new order for the authenticated user.
 * Relies on the HttpOnly session cookie for authentication.
 * @param orderData - The data required to create the order (paymentMethod, shippingAddress, etc.).
 * @returns The newly created order object.
 */

export async function createOrder(orderData: CreateOrderPayload): Promise<Order> {
  try {
    const response = await api.post<Order>('/orders', orderData);
    return response.data;
  } catch (err: any) {
    const errorMessage = err.response?.data?.error || 'Failed to create order. Please try again.';
    throw new Error(errorMessage);
  }
}

/**
 * Fetches all orders belonging to the authenticated user.
 * Relies on the HttpOnly session cookie for authentication.
 * @returns An array of the user's orders.
 */

export async function fetchUserOrders(): Promise<Order[]> {
  try {

    const response = await api.get<Order[]>('/orders');
   
    return response.data;
  } catch (err: any) {
    const errorMessage = err.response?.data?.error || 'Failed to fetch your orders.';
    throw new Error(errorMessage);
  }
}

/**
 * Fetches a single, specific order by its ID for the authenticated user.
 * Relies on the HttpOnly session cookie for authentication.
 * @param orderId - The ID of the order to fetch.
 * @returns The detailed order object.
 */

export async function fetchOrderById(orderId: number): Promise<Order> {
  try {

    const response = await api.get<Order>(`/orders/${orderId}`);
    return response.data;
  } catch (err: any) {

    const errorMessage = err.response?.data?.error || 'Failed to fetch order details.';
    throw new Error(errorMessage);
  }
}