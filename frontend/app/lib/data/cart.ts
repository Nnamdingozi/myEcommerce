import { NewCart } from '@/app/lib/definition';
  import axios from 'axios';
  
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  
  const configWithToken = (token: string | null) => ({
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

  
  export async function addItemsToCart(token: string | null, productId: number | null, quantity: number | null): Promise<NewCart | null> {
    try {
      const response = await axios.post<NewCart>(
        `${backendUrl}/cart`,
        { productId, quantity },
        configWithToken(token),
      );

      return response.data;
    } catch (err: any) {
      console.error('Error adding to cart:', err.response?.data || err.message || err);
      return null;
    }
  }
  
//   export async function fetchUserCart(token: string): Promise<NewCart[] | undefined> {
//     try {
//       const response = await axios.get<NewCart[]>(`${backendUrl}/cart`, configWithToken(token));
//       return response.data;
//     } catch (err: any) {
//       console.error('Error fetching cart items:', err.response?.data || err.message || err);
//       return undefined;
//     }
//   }


// export async function fetchUserCart(token?: string): Promise<NewCart[] | undefined> {
//     if (!token) {
//       console.warn('fetchUserCart was called without a token.');
//       return undefined;
//     }
  
//     try {
//       const response = await axios.get<NewCart[]>(`${backendUrl}/cart`, configWithToken(token));
//       return response.data;
//     } catch (err: any) {
//       console.error('Error fetching cart items:', err.response?.data || err.message || err);
//       return undefined;
//     }
//   }


export async function fetchUserCart(token?: string): Promise<NewCart[] | undefined> {
    if (!token) {
      console.warn('fetchUserCart was called without a token.');
      return undefined; // Prevent API call when token is missing
    }
  
    try {
      const response = await axios.get<NewCart[]>(`${backendUrl}/cart`, configWithToken(token));
      return response.data;
    } catch (err: any) {
      if (token) {
        console.error('Error fetching cart items:', err.response?.data || err.message || err);
      }
      return undefined;
    }
  }
  
  
  
  export async function updateCartItem(token: string, cartItemId: number, quantity: number): Promise<NewCart | undefined> {
    try {
      const response = await axios.put<NewCart>(`${backendUrl}/cart/${cartItemId}`, { quantity }, configWithToken(token));
      return response.data;
    } catch (err: any) {
      console.error('Error updating cart item:', err.response?.data || err.message || err);
      return undefined;
    }
  }
  
  export async function deleteUserItem(token: string, cartItemId: number): Promise<string | null> {
    try {
      const response = await axios.delete(`${backendUrl}/cart/${cartItemId}`, configWithToken(token));
      if (response.data?.message) {
        
        return response.data.message;
      } else {
        throw new Error('Unexpected response from the server');
      }
  
    } catch (err: any) {
      console.error('Error deleting cart item:', err.response?.data || err.message || err);
      return null;
    }
  }