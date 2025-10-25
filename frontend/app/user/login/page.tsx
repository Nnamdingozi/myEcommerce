'use client';

import { useRouter } from 'next/navigation';

// --- Import the correct types, context, and API functions ---
import { LoginRequest} from '@/app/lib/definition';
import { useUser } from '@/app/context/userContext';
import { userLogin } from '@/app/lib/data/user';
import UserLogin from '@/app/ui/userLogin'; 

export default function LoginPage() {
  const router = useRouter();
  // --- 1. Get the `setUser` function from the context ---

  const { setUser } = useUser();

  const handleLogin = async (credentials: LoginRequest) => {
    try {
 
      const { user } = await userLogin(credentials);

      setUser(user);
      
      // Redirect to a protected page on successful login
      router.push('/'); 
    } catch (error: any) {
      console.error('Login error:', error);


      throw error;
    }
  };

  const handleGitHubLogin = () => {

    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/github`; 
  };

 
  return (
    <div className='max-w-md mx-auto mt-10'>
 
      <UserLogin 
        onSubmit={handleLogin}
        onGitHubLogin={handleGitHubLogin}
      />
    </div>
  );
};