'use client'

import UserLogin from '@/app/ui/userLogin';
import { LoginRequest, LoginStatus } from '@/app/lib/definition';
import { userLogin, userProfile } from '@/app/lib/data';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '@/app/context/userContext';




const UserLoginForm: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const { setUser, saveToken } = useUser(); // Use context to handle state & token
    const router = useRouter();
  
    const handleLogin = async (user: LoginRequest): Promise<void> => {
      try {
        const response = await userLogin(user);
  
        if (response) {
          const { token } = response;
          console.log('Login successful, token received:', token);
  
          // Use context function to save the token
          saveToken(token);
  
          // Retrieve and set user profile
          const profileData = await userProfile(token);
          if (profileData) {
            setUser({ id: profileData.id, email: profileData.email, username: profileData.username });
            router.push('/');
          } else {
            setError('Failed to fetch user profile.');
          }
        }
      } catch (err) {
        console.error('Login error:', err);
        setError('An error occurred during login.');
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
      <div className='LoginContainer'>
        <UserLogin onSubmit={handleLogin} /> {/* Pass handleLogin as a prop */}
        {error && <p className='error-text'>{error}</p>}
      </div>
    );
  };

  export default UserLoginForm; 