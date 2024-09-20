import { LoginRequest, LoginStatus } from '@/app/lib/definition';
import { fetchByEmail } from '@/app/lib/data';
import { useState } from 'react';
import { useUser } from '@/app/context/userContext'

interface UserLoginProps {
    onSubmit: (userInput: LoginRequest) => Promise<{data: LoginRequest, status: LoginStatus} | undefined>
}

const UserLogin : React.FC<UserLoginProps> = ({ onSubmit }) => {
const [userInput, setUserInput] = useState({ email: '', password: ''});
const [error, setError] = useState< string | null>(null);
const { setUser } = useUser();


const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({...userInput, [e.target.name]: e.target.value});
}

const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInput.email|| !userInput.password) {
        setError('Both username and password are required.');
        return;
    }
    try {
        const response = await onSubmit(userInput);
        if(response && response.status === 200) {
            console.log('User submitted to database', response.data.email);
            const fetchUser = await fetchByEmail(response.data.email);
            if(fetchUser) {
               setUser({ name: fetchUser.username, id: fetchUser.id, email: fetchUser.email}) 
            } 
            
        } else {
            setError('Login failed. Please check your credentials.');
        }
    } catch (err){
        setError(`User Registration failed: ${err}`);
        console.error(error);
        // return undefined
    }

};

return (
    <div>

        <form className='mx-auto  w-[50%] rounded justify-center align-middle border-2 border-red-950 bg-gray-100 ' onSubmit={handleSubmit}>
            <input className='h-10 w-[80%] mb-3 rounded mt-4' type="email" name="email" placeholder="email" value={userInput.email} onChange={handleInputChange} required  />            
            <input className='h-10 w-[80%] mb-3 rounded' type="password" name="password" placeholder="password" value={ userInput.password} onChange={handleInputChange} required  />
            <button className='bg-rose-100 text-red-800 h-8 w-32 border-3 mb-5 border-red-800 rounded focus:bg-red-800 focus:text-rose-100' type='submit'>Log In</button>
        {error && <p>Error registering User: {error}</p>}
</form>
</div>
) 
};

export default UserLogin;