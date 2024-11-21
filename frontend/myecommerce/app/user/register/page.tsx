
'use client'

import React, { useEffect } from 'react';
import UserForm from '@/app/ui/userForm';
import { User } from '@/app/lib/definition';
import { registerUser, userProfile } from '@/app/lib/data';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/app/context/userContext';

const UserRegistration: React.FC = () => {
  const router = useRouter();
  const { setUser, saveToken } = useUser();

  const handleRegister = async (user: User): Promise<void> => {
    try {
      const { token } = await registerUser(user);  // Expect the token in the response

      if (token) {
        console.log('User successfully registered and received token:', token);

        // Store the token in localStorage
       saveToken(token)

        await userProfile(token);
      }
    } catch (err) {
      console.error('Registration error:', err);
      throw new Error('User registration failed');
    }
  };

  const fetchUserProfile = async (token: string) => {
    try {
      // Fetch the user profile using the token
      const profileData = await userProfile(token);

      if (profileData) {
        console.log('Profile data retrieved:', profileData);
        setUser({ id: profileData.id, email: profileData.email, username: profileData.username });

        // Redirect to the home page or wherever intended after login
        router.push('/');
      }
    } catch (profileError) {
      console.error('Error fetching profile data:', profileError);
    }
  };

  useEffect(() => {
    // Check for token on component mount
    const token = localStorage.getItem('authToken');
    if (token) {
      userProfile(token);
    }
  }, []);

  return (
    <div className='h-screen flex flex-col items-center justify-center bg-gray-100'>
      <UserForm onSubmit={handleRegister} />
      <button className='mt-4 bg-rose-100 text-red-800 px-6 py-2 rounded-md transition-colors duration-200 hover:bg-red-800 hover:text-rose-100'>
        <Link href='/user/login'>Log In</Link>
      </button>
    </div>
  );
};

export default UserRegistration;