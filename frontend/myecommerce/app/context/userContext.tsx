// 'use client'

// import { createContext, useState, useContext } from 'react';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';
// import { fetchByEmail, checkUserSession } from '../lib/data';

// interface User {
//     id: number | null;
//     username: string | null
// }


// interface UserContextProps {
//     user: User;
//     setUser: React.Dispatch<React.SetStateAction<User>>;
//     logout: () => void;

// }

// const UserContext = createContext<UserContextProps | undefined>(undefined);

// export const UserProvider = ({ children }: { children: React.ReactNode }) => {
//     const [user, setUser] = useState<User>({ id: null, username: null });
//     const [isSessionChecked, setIsSessionChecked] = useState<boolean>(false);
//     const router = useRouter();

//     const setUserPersistence = (userData: User | null) => {
//         setUser(userData || { id: null, username: null });
//         if (userData) {
//             localStorage.setItem('user', JSON.stringify(userData));
//         } else { localStorage.removeItem('user') }
//     }




//     const logout = () => {
//         setUserPersistence(null);
//         localStorage.removeItem('userEmail');
//         console.log(' user details cleared');
//         router.push('/')
//     }


//     const fetchUserFromLocalStorage = async () => {
//         const savedUser = localStorage.getItem('user');
//         if (savedUser) {
//             setUser(JSON.parse(savedUser));
//         } else {
//             const savedEmail = localStorage.getItem('userEmail');
//             if (savedEmail && !user.id) {
//                 try {
//                     const fetchedUser = await fetchByEmail(savedEmail);
//                     if (fetchedUser) {
//                         setUserPersistence(fetchedUser);
//                     }
//                 } catch (error) {
//                     console.error("Error fetching user by email:", error);
//                 }


//             }
//         }
//     };





//     const checkSessionData = async () => {
//         try {
//             const sessionData = await checkUserSession();
//             if (sessionData && sessionData.user) {
//                 setUserPersistence(sessionData.user);
//             } else {
//                 logout()
//             }
//         } catch (err: any) {
//             console.error('User data not found in session', err.message)
//             logout();
//         } finally {
//             setIsSessionChecked(true);
//         }
//     };

   
//     useEffect(() => {
//         let isMounted = true; // Track if the component is mounted
//         const fetchData = async () => {
//             if (typeof window !== 'undefined') {
//                 await fetchUserFromLocalStorage();
//                 await checkSessionData();
//             }
//         };

//         fetchData().catch(console.error); // Handle promise rejections

//         return () => {
//             isMounted = false; // Cleanup on unmount
//         };
//     }, []);


//     useEffect(() => {
//         if (isSessionChecked && !user.id) {
//             router.push('/')

//         }
//     }, [isSessionChecked, router, user.id])



//     return (
//         <UserContext.Provider value={{ user, setUser, logout }}>
//             {children}
//         </UserContext.Provider>
//     )
// };

// export const useUser = () => {
//     const context = useContext(UserContext);
//     if (!context) {
//         throw new Error("User mut be within a UserProvider");

//     }
//     return context
// };



'use client';

import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchByEmail, checkUserSession } from '../lib/data';

interface User {
  id: number | null;
  username: string | null;
}

interface UserContextProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({ id: null, username: null });
  const [isSessionChecked, setIsSessionChecked] = useState<boolean>(false);
  const router = useRouter();

  const setUserPersistence = (userData: User | null) => {
    setUser(userData || { id: null, username: null });
    if (userData) {
      document.cookie = `user=${encodeURIComponent(
        JSON.stringify(userData)
      )}; path=/; secure; samesite=strict`;
    } else {
      document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  };

  const logout = () => {
    setUserPersistence(null);
    console.log('User details cleared');
    router.push('/');
  };

  const fetchUserFromCookie = () => {
    const cookies = document.cookie.split('; ');
    const userCookie = cookies.find(cookie => cookie.startsWith('user='));
    if (userCookie) {
      const userData = JSON.parse(decodeURIComponent(userCookie.split('=')[1]));
      setUser(userData);
      console.log('User restored from cookie:', userData);
    }
  };

  const checkSessionData = async () => {
    try {
      const sessionData = await checkUserSession();
      if (sessionData && sessionData.user) {
        setUserPersistence(sessionData.user);
      } else {
        logout();
      }
    } catch (err: any) {
      console.error('User data not found in session', err.message);
      logout();
    } finally {
      setIsSessionChecked(true);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      if (typeof window !== 'undefined' && isMounted) {
        fetchUserFromCookie();
        await checkSessionData();
      }
    };

    fetchData().catch(console.error);

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (isSessionChecked && !user.id) {
      router.push('/');
    }
  }, [isSessionChecked, router, user.id]);

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('User must be within a UserProvider');
  }
  return context;
};
