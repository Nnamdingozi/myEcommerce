
'use client';

import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { userProfile } from '../lib/data';

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

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile>({ id: null, email: null, username: null });
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  // Save token in localStorage and cookies
  const saveToken = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);

    const isSecure = process.env.NODE_ENV === 'production' ? 'secure;' : '';
    document.cookie = `token=${newToken}; path=/; ${isSecure} samesite=strict`;
  };

  // Logout function
  const logout = () => {
    setUser({ id: null, email: null, username: null });
    setToken(null);
    localStorage.removeItem('token');
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/');
  };

  // Authenticate user
  const authenticateUser = async () => {
    const savedToken = token || localStorage.getItem('token');
    if (savedToken) {
      try {
        const userProfileData = await userProfile(savedToken);
        if (userProfileData) {
          setToken(savedToken);
          setUser(userProfileData);
         
        } else {
          logout();
        }
      } catch (error: any) {
        console.error('Authentication failed:', error);
        if (error.response?.status === 401) {
          // Token invalid
          logout();
        }
      }
    } else {
      logout();
    }
  };

  // Authenticate on mount
  useEffect(() => {
    authenticateUser().catch(console.error);
  }, []);

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
