'use client'

import UserLogin from '@/app/ui/userLogin';
import { LoginRequest, LoginStatus } from '@/app/lib/definition';
import {  userLogging, fetchByEmail } from '@/app/lib/data';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '@/app/context/userContext';

const UserLoginForm: React.FC = () => {
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { setUser } = useUser();

    const handleLogin = async(user: LoginRequest): Promise<{data: LoginRequest, status: LoginStatus }| undefined> => {
        try {
const response = await userLogging(user);
console.log('login response:', response)
if(response && response.status === 200) {
    console.log('Login Successful, redirect to home, fetching user details...')
    const fetchUser = await fetchByEmail(user.email);
    console.log('Login successful',  fetchUser);
    if(fetchUser) {
        setUser({id: fetchUser.id, username: fetchUser.username});
        setLoginSuccess(true);
        return { data: user, status: response.status };
    }
  
} else {
    console.log('Unable to fetch user details with email after login ');
setError('Login failed. Please check your credentials')
}
        } catch (err) {
            console.error('Logging error:', err);
       setError('An error occured during login')
        }
    }
    useEffect(() => {
        if (loginSuccess) {
         router.push('/');
         console.log('log in succeesuful')
        
        }
    }, [loginSuccess, router]);

    return (
        <div className='flex flex-col align-middle justify-center mt-16 border-3 border-red-950 w-[80%] mx-auto'>
            <h2 className='text-center'>Log IN</h2>
        <UserLogin onSubmit={handleLogin}/>
        </div>
        
    )

};
export default UserLoginForm; 