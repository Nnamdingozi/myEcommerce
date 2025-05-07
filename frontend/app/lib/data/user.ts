import {   UserProfile } from '@/app/lib/definition';
  import axios from 'axios';
  
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
 
  const configWithToken = (token: string | null) => ({
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
  
  export async function registerUser(user: { username: string; email: string; phone: string; password: string; country_code: string; }): Promise<{ token: string }> {
    try {
      const response = await axios.post(`${backendUrl}/auth/register`, user);
      return { token: response.data.token };
    
    } catch (error) {
      throw new Error('Failed to register user');
    }
  }
  
  export async function userLogin(user: { email: string; password: string }): Promise<{ token: string }> {
    try {
      const response = await axios.post(`${backendUrl}/auth/login`, user);
      return { token: response.data.token };
    } catch (err: any) {
      console.error('Error logging in user:', err.response?.data || err.message || err);
      throw new Error('User login failed');
    }
  }
  
  export async function githubLogin(): Promise<{ token: string }> {
    try {
      const response = await axios.get(`${backendUrl}/auth/github/callback`);
      if (!response.data?.token) {
        throw new Error('No token returned from GitHub login');
      }
      return { token: response.data.token };
    } catch (err: any) {
      console.error('Error during GitHub login:', err.response?.data || err.message || err);
      throw new Error('GitHub login failed');
    }
  }
  
  
  
  
  export async function userProfile(token: string): Promise<UserProfile | undefined> {
    try {
      const response = await axios.get<UserProfile>(`${backendUrl}/auth/profile`, configWithToken(token));
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
      return response.data;
    } catch (err: any) {
      console.error('Error fetching user:', err.response?.data || err.message || err);
      return undefined;
    }
  }