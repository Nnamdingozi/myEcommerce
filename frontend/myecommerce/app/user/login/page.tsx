'use client'

import UserLogin from '@/app/ui/userLogin';
import { LoginRequest, LoginStatus } from '@/app/lib/definition';
import {  userLogging } from '@/app/lib/data';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
const UserLoginForm: React.FC = () => {
    const [loginSuccess, setLoginSuccess] = useState(false);
    const router = useRouter();
    const handleLogin = async(user: LoginRequest): Promise<{data: LoginRequest, status: LoginStatus }| undefined> => {
        try {
const response = await userLogging(user);
console.log('login response:', response)
if(response && response.status === 200) {
    console.log('Login Successful, redirect to home');
    setLoginSuccess(true);
    
} else {
    console.log('Login failed or no response');
}
        } catch (err) {
            console.error('Logging error:', err);
        return undefined
        }
    }
    useEffect(() => {
        if (loginSuccess) {
            console.log('Redirecting to home page');
            router.push('/');
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