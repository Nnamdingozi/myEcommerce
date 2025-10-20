'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner'; 

// --- Import our types, context, and UI components ---
import { RegistrationPayload } from '@/app/lib/definition';
import { useUser } from '@/app/context/userContext';
import { registerUser } from '@/app/lib/data/user';
import UserForm from '@/app/ui/userForm'; 

export default function RegistrationPage() {
  const router = useRouter();
  // --- 1. Get the `setUser` function from the context ---
  const { setUser } = useUser();

  const handleRegister = async (userInput: RegistrationPayload) => {
    try {
    
      const { user } = await registerUser(userInput);
      
      // --- 3. Update the global user state with the returned user object ---
      setUser(user);
      
      // Provide success feedback to the user
      toast.success('Registration successful!', {
        description: `Welcome, ${user.username}! Redirecting you now...`,
      });

      // Redirect to a protected page after a short delay
      setTimeout(() => {
        router.push('/home'); // Or any other protected route
      }, 1500);

    } catch (error: any) {
      console.error('Registration error:', error);
   
      throw error;
    }
  };

  return (
    <UserForm onSubmit={handleRegister} />
  );
}