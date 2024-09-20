'use client'

import { createContext, useState, useContext } from 'react';
interface UserContextProps {
    user: { name: string | null, id: number | null, email?: string | null  };
    setUser: React.Dispatch<React.SetStateAction<{ name: string | null , id: number | null , email?: string | null }>>;
logout: () => void
}

const UserContext = createContext<UserContextProps | undefined>(undefined);
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<{ name: string | null , id: number | null, email?: string | null }>({ name: null, id: null, email: null });
    const logout = () => {
        setUser({name: null, id: null, email: null});
        console.log(' user details cleared')

    }
    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    )
};

export const useUser = () => {
    const context = useContext(UserContext);
    if(!context) {
        throw new Error("User mut be within a UserProvider")
    }
    return context
};
