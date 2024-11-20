



// 'use client';

// import { createContext, useState, useContext, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { userProfile } from '../lib/data'; // Fetch user profile function using Passport JWT

// interface User {
//   id: number | null;
//   username: string | null;
// }

// interface UserContextProps {
//   user: User;
//   setUser: React.Dispatch<React.SetStateAction<User>>;
//   logout: () => void;
// }

// const UserContext = createContext<UserContextProps | undefined>(undefined);

// export const UserProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User>({ id: null, username: null });
//   const [isSessionChecked, setIsSessionChecked] = useState<boolean>(false);
//   const router = useRouter();

//   const setUserPersistence = (userData: User | null) => {
//     setUser(userData || { id: null, username: null });
//     if (userData) {
//       document.cookie = `jwtToken=${userData.token}; path=/; secure; samesite=strict`; // Store token as a cookie
//     } else {
//       document.cookie = "jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//     }
//   };

//   const logout = () => {
//     setUserPersistence(null);
//     console.log('User details cleared');
//     router.push('/login'); // Redirect to login
//   };

//   const getJwtToken = () => {
//     const cookies = document.cookie.split('; ');
//     const tokenCookie = cookies.find(cookie => cookie.startsWith('jwtToken='));
//     return tokenCookie ? tokenCookie.split('=')[1] : null;
//   };

//   const authenticateUser = async () => {
//     const token = getJwtToken();
//     if (!token) {
//       logout(); // No token, redirect to login
//       return;
//     }
//     try {
//       const userProfileData = await userProfile(token); // Fetch user profile with Passport JWT
//       if (userProfileData) {
//         setUserPersistence(userProfileData);
//       } else {
//         logout();
//       }
//     } catch (error) {
//       console.error('Authentication failed:', error);
//       logout();
//     } finally {
//       setIsSessionChecked(true);
//     }
//   };

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       authenticateUser().catch(console.error); // Fetch user profile on load if token exists
//     }
//   }, []);

//   return (
//     <UserContext.Provider value={{ user, setUser, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('User must be within a UserProvider');
//   }
//   return context;
// };


// 'use client'

// import { createContext, useState, useContext } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import { userProfile } from '../lib/data';
// import { useEffect } from 'react';

// interface UserProfile {
//   id: number | null;
//   email: string | null;
//   username: string | null;
// }

// interface UserContextProps {
//   user: UserProfile;
//   setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
//  token: string | null;
//   logout: () => void;
//   saveToken: (token: string) => void
// }

// const UserContext = createContext<UserContextProps | undefined>(undefined);

// export const UserProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<UserProfile>({ id: null, email: null, username: null });
//   const [token, setToken] = useState<string | null>(null);
//   const router = useRouter();


//   // const saveToken = (newToken: string) => {
//   //   setToken(newToken);
//   //   // Optionally, save to localStorage to persist between sessions
//   //   // localStorage.setItem('token', newToken);
//   //   document.cookie = `token=${token}; path=/; secure; samesite=strict`;
//   // };
  
//   const saveToken = (newToken: string) => {
//     setToken(newToken);
//     localStorage.setItem('token', newToken);
//     document.cookie = `token=${newToken}; path=/; secure; samesite=strict`;
//   };
  
  
//   const logout = () => {
//     setUser({ id: null, email: null, username: null });
//     document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
//     router.push('/');
//   };

//   return (
//     <UserContext.Provider value={{ user, setUser, token, logout, saveToken }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUser must be used within a UserProvider');
//   }
//   return context;
// };


// 'use client'

// import { createContext, useState, useContext, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { userProfile } from '../lib/data'; // Assuming this function fetches user profile using a token

// interface UserProfile {
//   id: number | null;
//   email: string | null;
//   username: string | null;
// }

// interface UserContextProps {
//   user: UserProfile;
//   setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
//   token: string | null;
//   logout: () => void;
//   saveToken: (token: string) => void;
// }

// const UserContext = createContext<UserContextProps | undefined>(undefined);

// export const UserProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<UserProfile>({ id: null, email: null, username: null });
//   const [token, setToken] = useState<string | null>(null);
//   const router = useRouter();

//   const saveToken = (newToken: string) => {
//     setToken(newToken);
//     localStorage.setItem('token', newToken);
//     document.cookie = `token=${newToken}; path=/; secure; samesite=strict`;
//   };

//   const logout = () => {
//     setUser({ id: null, email: null, username: null });
//     localStorage.removeItem('token');
//     document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
//     router.push('/');
//   };

//   const authenticateUser = async () => {

//     if (!token) {
//       console.warn('No token provided. Skipping add to cart request.');
//       return undefined;
//     }
//     const savedToken = localStorage.getItem('token');
//     if (savedToken) {
//       try {
//         const userProfileData = await userProfile(savedToken);
//         if (userProfileData) {
//           setUser(userProfileData);
//           setToken(savedToken);
//         } else {
//           logout();
//         }
//       } catch (error) {
//         console.error('Authentication failed:', error);
//         logout();
//       }
//     } else {
//       logout();
//     }
//   };

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       authenticateUser().catch(console.error);
//     }
//   }, []);

//   return (
//     <UserContext.Provider value={{ user, setUser, token, logout, saveToken }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUser must be used within a UserProvider');
//   }
//   return context;
// };


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
