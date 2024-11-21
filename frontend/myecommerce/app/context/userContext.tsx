
'use client';


import { createContext, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
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
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
  const router = useRouter();

  const saveToken = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    document.cookie = `token=${newToken}; path=/; secure; samesite=strict`;
  };

  const logout = () => {
    setUser({ id: null, email: null, username: null });
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/'); // Redirect to homepage on logout
  };

  const authenticateUser = async () => {
    const savedToken = token || localStorage.getItem('token') || getCookie('token');
    if (savedToken) {
      try {
        const userProfileData = await userProfile(savedToken);
        if (userProfileData) {
          setUser(userProfileData);
          setToken(savedToken);
          setIsAuthenticated(true);
        } else {
          logout(); // Token invalid, log the user out
        }
      } catch (error) {
        console.error('Authentication failed:', error);
        logout();
      }
    } else {
      logout(); // No token found, log the user out
    }
  };

  const getCookie = (name: string): string | null => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  };

  useEffect(() => {
    if (!isAuthenticated && typeof window !== 'undefined') {
      authenticateUser().catch(console.error);
    }
  }, [isAuthenticated]); // Only re-run if authentication status changes

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
