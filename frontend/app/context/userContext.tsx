
'use client';

import { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
// --- Import our official types and API functions ---
import { UserProfile } from '../lib/definition';
import { fetchUserProfile, userLogout } from '../lib/data/user'; 

interface UserContextProps {
  user: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: UserProfile | null) => void; 
  logout: () => Promise<void>;
  checkUserStatus: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // This function is called on app load to check if a valid cookie exists
  const checkUserStatus = useCallback(async () => {
  
    try {
      // The browser automatically sends the cookie.
      const { user: userProfileData } = await fetchUserProfile();
      setUser(userProfileData);
    } catch (err: any) {
    
       if (err.response?.status >= 500) {
        setError(err.message || 'Failed to connect to the server.');
       }
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Run the check once when the app loads
  useEffect(() => {
    checkUserStatus();
  }, [checkUserStatus]);

  const logout = useCallback(async () => {
    try {
      // Call the API endpoint to clear the HttpOnly cookie on the backend.
      await userLogout();
    } catch (error: any) {
      setError(error)
      console.error("Logout API call failed:", error);
    
    } finally {
      setUser(null);
      // Redirect to  home page
      router.push('/home');
    }
  }, [router]);

  
  return (
    <UserContext.Provider value={{ user, isLoading, setUser, checkUserStatus, logout, error }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook remains the same
export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};