
'use client';

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { userProfile } from '../lib/data/user';
import { useCallback } from 'react';

interface UserProfile {
  id: number | null;
  email: string | null;
  username: string | null;
}

interface UserContextProps {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  token: string | null;
  logout: () => void;
  saveToken: (token: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile>({ id: null, email: null, username: null });
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const syncToken = (newToken: string | null) => {
    setToken(newToken);

    if (typeof window !== 'undefined') {
      if (newToken) {
        // Update localStorage
        localStorage.setItem('token', newToken);
        // Set cookie: include "secure" only in production environments.
        const secureFlag = process.env.NODE_ENV === 'production' ? 'secure;' : '';
        document.cookie = `token=${newToken}; path=/; ${secureFlag} samesite=strict`;
      } else {
        // Remove token from localStorage and cookies if token is null.
        localStorage.removeItem('token');
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      }
    }
  };


  // Call this function to store a new token.

  const saveToken = (newToken: string) => {
    syncToken(newToken);
  };


  // Clears the user state and token from all storages, then navigates to the home page.

  const logout = useCallback(() => {
    setUser({ id: null, email: null, username: null });
    syncToken(null);
    router.push('/');
  }, [router]);


  //  Authenticates the user using the provided token.

  const authenticateUser = useCallback(async (currentToken: string) => {
    try {
      const userProfileData = await userProfile(currentToken);
      if (userProfileData) {
        setUser(userProfileData);
      } else {
        logout();
      }
    } catch (error: any) {
      console.error('Authentication failed:', error);
      if (error.response?.status === 401) {
        logout();
      }
    }
  }, [logout]);

  // On mount, check for a stored token in localStorage.


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        syncToken(storedToken);
        authenticateUser(storedToken);
      }
    }


  }, [authenticateUser]);


  return (
    <UserContext.Provider value={{ user, setUser, token, logout, saveToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
