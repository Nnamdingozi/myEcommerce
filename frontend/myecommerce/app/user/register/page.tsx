'use client'

import UserForm from '@/app/ui/userForm';
import { User } from '@/app/lib/definition';
import {  registerUser } from '@/app/lib/data';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const UserRegistration: React.FC = () =>  {
    const router = useRouter();
    const handleRegister = async(user: User): Promise<{ id: number; username: string; email: string; }> => {
        try {
const userRegistered = await registerUser(user);
if(userRegistered) {
  console.log('user successfully registered:', userRegistered)
};


return userRegistered
        } catch (err) {
            console.error('Registration error:', err);
            throw new Error('User Registration failed')
        }
    }

    return (
        <div className='h-screen flex flex-col items-center justify-center bg-gray-100'>
        <UserForm onSubmit={handleRegister} />
        <button className='mt-4 bg-rose-100 text-red-800 px-6 py-2 rounded-md transition-colors duration-200 hover:bg-red-800 hover:text-rose-100'>
            <Link href='/user/login'>Log In</Link>
        </button>
    </div>
        
    )

};
export default UserRegistration; 