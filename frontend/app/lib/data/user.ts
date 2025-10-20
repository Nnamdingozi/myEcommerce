
// app/lib/data/user.ts

import api from '../axiosApi'; // Import our configured Axios instance
import { AuthResponse, LoginRequest, RegistrationPayload, UserProfile } from '@/app/lib/definition';

/**
 * Registers a new user. The backend will set an HttpOnly cookie on success.
 * @param userData The user's registration details (username, email, etc.).
 * @returns An object containing the user profile.
 */
export async function registerUser(userData: RegistrationPayload): Promise<AuthResponse> {
  try {
    // The backend now returns { user: UserProfile }
    const response = await api.post<AuthResponse>('/auth/register', userData);
    return response.data;
  } catch (err: any) {
    // Re-throw a more informative error for the UI
    throw new Error(err.response?.data?.error || 'Registration failed. Please try again.');
  }
}

/**
 * Logs in a user. The backend will set an HttpOnly cookie on success.
 * @param credentials The user's email and password.
 * @returns An object containing the user profile.
 */
export async function userLogin(credentials: LoginRequest): Promise<AuthResponse> {
  try {
    // The backend now returns { user: UserProfile }
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.error || 'Login failed. Please check your credentials.');
  }
}

/**
 * Logs out the current user by calling the backend to clear the session cookie.
 * @returns A promise that resolves to void on success.
 */
export async function userLogout(): Promise<void> {
  try {
    // The browser automatically sends the cookie. No payload or config is needed.
    await api.post('/auth/logout');
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Logout failed. Please try again.');
  }
}

/**
 * Fetches the currently authenticated user's profile using the session cookie.
 * @returns The user's profile data.
 */
export async function fetchUserProfile(): Promise<{ user: UserProfile }> {
  try {
    // 1. Make a GET request to the `/auth/me` endpoint.
    //    The global `api` instance ensures `withCredentials: true` is set,
    //    so the browser will send the session cookie.
    const response = await api.get<{ user: UserProfile }>('/auth/me');
    
    // 2. The backend's `getMeHandler` will return an object like `{ user: { id: 1, ... } }`.
    //    We return this entire object.
    return response.data;
  } catch (err: any) {
    // 3. If the cookie is missing or invalid, the backend will send a 401 error.
    //    Axios will throw an error, which we catch here.
    const errorMessage = err.response?.data?.error || 'Could not fetch user profile. You may not be logged in.';
    
    // 4. We re-throw the error so the calling component (like UserContext)
    //    knows that the authentication check failed.
    throw new Error(errorMessage);
  }
}



/*
  // DELETE or REFACTOR THESE: These functions were for a token-based system.
  // With RLS and HttpOnly cookies, you generally don't need endpoints to fetch
  // arbitrary user data. You fetch the *current* user with fetchUserProfile.
  // If you needed an admin panel to fetch all users, you would create a separate
  // admin-only API service.
  export async function fetchByEmail(...) { ... }
  export async function fetchAllUsers(...) { ... }
*/