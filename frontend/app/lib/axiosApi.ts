// app/lib/api.ts
import axios from 'axios';

// Get the base URL from environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Create a single, configured Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  // This is the most important part! It tells Axios to send cookies
  // with every cross-domain request.
  withCredentials: true, 
});

export default api;