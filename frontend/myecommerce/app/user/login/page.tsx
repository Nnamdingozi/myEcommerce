// 'use client'

// import UserLogin from '@/app/ui/userLogin';
// import { LoginRequest, LoginStatus } from '@/app/lib/definition';
// import { userLoggin, userProfile } from '@/app/lib/data';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { useUser } from '@/app/context/userContext';

// const UserLoginForm: React.FC = () => {
//     const [loginSuccess, setLoginSuccess] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const router = useRouter();
//     const { setUser } = useUser();


//     const handleLogin = async (user: LoginRequest): Promise<void> => {

//         const { token } = await userLoggin(user);
//         console.log('login response:', token);

//         if (token) {
//             console.log('Login successful, fetching user profile...');
//             // Store the token using the helper function from context or inline if necessary
//             document.cookie = `token=${token}; path=/; secure; samesite=strict`;

//             try {

//                 // Get the token from cookies or storage
//                 const storedToken = token;  // Use the token from above
//                 // Fetch the user profile using userProfile after successful login
//                 const profileData = await userProfile(storedToken);



//                 if (profileData) {
//                     console.log('Profile data retrieved:', profileData);
//                     setUser({ id: profileData.id, email: profileData.email, username: profileData.username });
//                     setLoginSuccess(true);

//                     // Redirect to the home page or wherever intended after login
//                     router.push('/');

//                 } else {
//                     console.log('Unable to retrieve profile data');
//                     setError('Failed to fetch user profile after login.');
//                 }
           
//         } catch (err) {
//             console.error('Logging error:', err);
//             setError('An error occurred during login.');
//         }
//     };


//     useEffect(() => {
//         if (loginSuccess) {
//             router.push('/');
//             console.log('log in succeesuful')

//         }
//     }, [loginSuccess, router]);

//     return (
//         <div className='flex flex-col align-middle justify-center mt-16 border-3 border-red-950 w-[80%] mx-auto'>
//             <h2 className='text-center'>Log IN</h2>
//             <UserLogin onSubmit={handleLogin} />
//         </div>

//     )

// };
// export default UserLoginForm; 




// 

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