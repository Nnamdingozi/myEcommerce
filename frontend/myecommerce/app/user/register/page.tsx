'use client'

import UserForm from '@/app/ui/userForm';
import { User } from '@/app/lib/definition';
import {  registerUser } from '@/app/lib/data';
import { useRouter } from 'next/navigation';

const UserRegistration: React.FC = () => {
    const router = useRouter();
    const handleRegister = async(user: User) => {
        try {
await registerUser(user);
router.push('/user/login')
        } catch (err) {
            console.error('Registration error:', err);
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