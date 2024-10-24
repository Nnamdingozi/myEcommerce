'use client'

import { createContext, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { fetchByEmail, checkUserSession } from '../lib/data';

interface User {
    id: number | null;
    username: string | null
}


interface UserContextProps {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
logout: () => void;

}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User>({id: null, username: null});
    const [isSessionChecked, setIsSessionChecked] = useState<boolean>(false);
    const router = useRouter();
    
    const setUserPersistence = (userData: User | null) => {
        setUser(userData || {id: null, username: null });
        if(userData) {
            localStorage.setItem('user', JSON.stringify(userData));
        } else {localStorage.removeItem('user')}
    }
    
    
    
    
    const logout = () => {
        setUserPersistence(null);
        localStorage.removeItem('userEmail');
        console.log(' user details cleared');
        router.push('/')
    } 
    

        const fetchUserFromLocalStorage = async () => {
            const savedUser = localStorage.getItem('user');
            if(savedUser) {
                setUser(JSON.parse(savedUser));
            } else {
                const savedEmail = localStorage.getItem('userEmail');
                if (savedEmail && !user.id) {
                    try {
                        const fetchedUser = await fetchByEmail(savedEmail);
                        if (fetchedUser) {
                            setUserPersistence(fetchedUser);
                        }
            } catch (error) {
                console.error("Error fetching user by email:", error);
            }
            
            
                } 
            }
        };

    
       
       

    const checkSessionData = async() => {
try {
    const sessionData = await checkUserSession();
    if(sessionData && sessionData.user){
        setUserPersistence(sessionData.user);
    }else {
        logout()
    }
} catch (err: any) {
    console.error('User data not found in session', err.message)
    logout();
} finally {
    setIsSessionChecked(true);
}
    };

    useEffect(()=> {
        if (typeof window !== 'undefined') {
            fetchUserFromLocalStorage();
            checkSessionData();
        }
      
    }, []);

    useEffect(()=> {
        if(isSessionChecked && !user.id) {
            router.push('/')

        }
    }, [isSessionChecked, router, user.id])
 

  
    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    )
};

export const useUser = () => {
    const context = useContext(UserContext);
    if(!context) {
        throw new Error("User mut be within a UserProvider");

    }
    return context
};
