
'use client';

import React, { useEffect, useState } from 'react';
import UserForm from '@/app/ui/userForm';
import { User } from '@/app/lib/definition';
import { registerUser, userProfile } from '@/app/lib/data/user';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/app/context/userContext';


const UserRegistration = () => {
  const { saveToken, setUser } = useUser(); // Use saveToken and setUser from UserContext
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  // Function to fetch user profile
  const fetchUserProfile = async (token: string): Promise<void> => {
    try {
      const profileData = await userProfile(token); // Pass token to API
      if (profileData) {
        console.log('profileData fetched after registration:', profileData)
        setUser({
          id: profileData.id,
          email: profileData.email,
          username: profileData.username,
        });
        router.push('/'); // Redirect to homepage after successful login
      }
    } catch (err) {
      setErrorMessage('Failed to retrieve profile data. Please log in again.');
    }
  };

  // Handle user registration
  const handleRegister = async (user: User): Promise<void> => {
    console.log('use object received in register page:', user)
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const { token } = await registerUser(user); // Call API to register user and get the token

      if (token) {
        console.log('token received after registration:', token)
        saveToken(token); // Use the saveToken function from UserContext
        setSuccessMessage('Registration successful! Redirecting...');
        await fetchUserProfile(token); // Fetch profile using the saved token
      }
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message || 'Registration failed. Please try again.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-auto items-center flex-col">
      <div className="w-full md:w-1/2 h-full bg-gray-100 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {errorMessage && (
            <div className="text-red-600 bg-red-100 p-3 rounded mb-4">
              <strong>{errorMessage}</strong>
            </div>
          )}

          {successMessage && (
            <div className="text-green-600 bg-green-100 p-3 rounded mb-4">
              <strong>{successMessage}</strong>
            </div>
          )}

          {loading ? (
            <div className="text-center text-rose-600">Processing...</div>
          ) : (
            <UserForm onSubmit={handleRegister} /> // Your form component
          )}
        </div>
      </div>

      <div className="w-full md:w-[40%] h-28 bg-gradient-to-r from-rose-100 to-red-800 flex flex-col items-center justify-center p-6 rounded-lg">
        <p className="text-lg font-semibold text-white mb-4">Already have an account?</p>
        <Link href="/user/login">
          <button className="mt-3 bg-rose-100 text-red-800 px-6 py-2 rounded-lg shadow-md transition-colors duration-200 hover:bg-red-800 hover:text-rose-100">
            Log In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserRegistration;

