
'use client'

import { 
  Product, Category, UserProfile, NewCart, Order, Paystack, VerifyTransactionResponse, ProductDetails
} from '@/app/lib/definition';
import axios from 'axios';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
console.log(backendUrl);

const configWithToken = (token: string | null) => ({
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
});

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await axios.get<Product[]>(`${backendUrl}/product`);
    console.log('Product response received:', response.data);
    return response.data;
  } catch (err) {
    console.error('Error fetching products:', err);
    return [];
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await axios.get<Category[]>(`${backendUrl}/product/categories`);
    console.log('Categories received:', response.data);
    return response.data;
  } catch (err: any) {
    console.error('Error fetching categories:', err.response?.data || err.message || err);
    return [];
  }
}

export async function fetchProductsByCategoryId(id: number): Promise<ProductDetails[]> {
  try {
    const response = await axios.get(`${backendUrl}/product/categoryProduct/${id}`);
    return response.data;
  } catch (err: any) {
    console.error('Error fetching products by category:', err);
    return [];
  }
}

export async function registerUser(user: { username: string; email: string; phone: string; password: string; country_code: string; }): Promise<{ token: string }> {
  try {
    const response = await axios.post(`${backendUrl}/auth/register`, user);
    console.log('Received token from backend:', response.data);
    return { token: response.data.token };
  } catch (error) {
    // console.error('Error registering user:', error);
    throw new Error('Failed to register user');
  }
}

export async function userLogin(user: { email: string; password: string }): Promise<{ token: string }> {
  try {
    console.log('User login data sent from onsubmit to API:', user);
    const response = await axios.post(`${backendUrl}/auth/login`, user);
    console.log('Token from userLogin:', response.data);
    return { token: response.data.token };
  } catch (err: any) {
    console.error('Error logging in user:', err.response?.data || err.message || err);
    throw new Error('User login failed');
  }
}

export async function userProfile(token: string): Promise<UserProfile | undefined> {
  try {
    const response = await axios.get<UserProfile>(`${backendUrl}/auth/profile`, configWithToken(token));
    console.log('User data retrieved:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching user profile:', error.response?.data || error.message || error);
    return undefined;
  }
}

export async function fetchByEmail(email: string, token: string): Promise<{ id: number; username: string } | undefined> {
  try {
    const response = await axios.get(`${backendUrl}/users/email`, {
      params: { email },
      ...configWithToken(token),
    });
    console.log('Fetch user by email endpoint hit, data:', response.data);
    return response.data;
  } catch (err: any) {
    console.error('Error fetching user:', err.response?.data || err.message || err);
    return undefined;
  }
}

export async function addItemsToCart(token: string | null, productId: number | null, quantity: number | null): Promise<NewCart | null> {
  try {
    const response = await axios.post<NewCart>(
      `${backendUrl}/cart`,
      { productId, quantity },
      configWithToken(token),
    );
    console.log('Cart data sent to database:', response.data);
    return response.data;
  } catch (err: any) {
    console.error('Error adding to cart:', err.response?.data || err.message || err);
    return null;
  }
}

export async function fetchUserCart(token: string): Promise<NewCart[] | undefined> {
  try {
    const response = await axios.get<NewCart[]>(`${backendUrl}/cart`, configWithToken(token));
    console.log('Cart data retrieved:', response.data);
    return response.data;
  } catch (err: any) {
    console.error('Error fetching cart items:', err.response?.data || err.message || err);
    return undefined;
  }
}

export async function updateCartItem(token: string, cartItemId: number, quantity: number): Promise<NewCart | undefined> {
  try {
    const response = await axios.put<NewCart>(`${backendUrl}/cart/${cartItemId}`, { quantity }, configWithToken(token));
    console.log('Updated cart item:', response.data);
    return response.data;
  } catch (err: any) {
    console.error('Error updating cart item:', err.response?.data || err.message || err);
    return undefined;
  }
}

export async function deleteUserItem(token: string, cartItemId: number): Promise<boolean> {
  try {
    const response = await axios.delete(`${backendUrl}/cart/${cartItemId}`, configWithToken(token));
    console.log('Deleted cart item:', response.status);
    return response.status === 204;
  } catch (err: any) {
    console.error('Error deleting cart item:', err.response?.data || err.message || err);
    return false;
  }
}

export async function createOrder(token: string, paymentMtd: string, shippingAddy: string, shippingMtd: string, curr: string) {
  try {
    const response = await axios.post(`${backendUrl}/order`, { paymentMtd, shippingAddy, shippingMtd, curr }, configWithToken(token));
    console.log('Order successfully created:', response.data);
    return response.data;
  } catch (err: any) {
    console.error('Error creating order:', err.response?.data || err.message || err);
    throw new Error('Failed to create order');
  }
}

export async function fetchUserOrder(token: string): Promise<Order[] | null> {
  try {
    const response = await axios.get(`${backendUrl}/order`, configWithToken(token));
    console.log('User orders fetched:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return null;
  }
}

export async function fetchOrderById(token: string, orderId: number): Promise<Order | null> {
  try {
    const response = await axios.get(`${backendUrl}/order/${orderId}`, configWithToken(token));
    console.log('Order details fetched by ID:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    return null;
  }
}

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

export async function verifyPaystack(reference: string): Promise<VerifyTransactionResponse | null> {
  try {
    // Pass reference as a URL parameter (/:reference)
    const response = await axios.get(`${backendUrl}/checkout/verify/${reference}`);
    console.log('Paystack payment verified:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error verifying Paystack payment:', error);
    return null;
  }
}
