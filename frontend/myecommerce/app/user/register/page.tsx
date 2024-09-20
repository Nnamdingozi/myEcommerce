'use client'

import UserForm from '@/app/ui/userForm';
import { User } from '@/app/lib/definition';
import {  registerUser } from '@/app/lib/data';
import { useRouter } from 'next/navigation';

const UserRegistration: React.FC = () =>  {
    const router = useRouter();
    const handleRegister = async(user: User): Promise<{ id: number; username: string; email: string; }> => {
        try {
const userRegistered = await registerUser(user);
router.push('/user/login');
return userRegistered
        } catch (err) {
            console.error('Registration error:', err);
            throw new Error('User Registration failed')
        }
    }

    return (
        <div>
            <h2>Register</h2>
        <UserForm onSubmit={handleRegister}/>
        </div>
        
    )

};
export default UserRegistration; 