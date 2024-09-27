'use client'

import { createContext, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
interface UserContextProps {
    user: { id: number | null, name: string | null };
    setUser: React.Dispatch<React.SetStateAction<{ id: number | null, name: string | null}>>;
logout: () => void
}

const UserContext = createContext<UserContextProps | undefined>(undefined);
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<{ id: number | null, name: string | null}>({id: null, name: null});
    const router = useRouter();
    const logout = () => {
        setUser({ id: null, name: null});
        router.push('/')
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
