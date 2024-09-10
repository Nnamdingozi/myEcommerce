import { LoginRequest } from '@/app/lib/definition';

import { useState } from 'react';

interface UserLoginProps {
    onSubmit: (user: LoginRequest) => Promise<LoginRequest | undefined>
}

const UserLogin : React.FC<UserLoginProps> = ({ onSubmit }) => {
const [user, setUser] = useState({ username: '', password: ''});
const [error, setError] = useState< string | null>(null);

const passwordCriteria = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [e.target.name]: e.target.value});
}

const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user.username || !user.password) {
        setError('Both username and password are required.');
        return;
    }
    try {
        const response = await onSubmit(user);
        if(response) {
            console.log('User submitted to database')
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

        <form className='mx-auto' onSubmit={handleSubmit}>
            <input className='h-16 w-[80%] mb-3' type="text" name="username" placeholder="Username" value={user.username} onChange={handleInputChange} required  />            
            <input className='h-16 w-[80%] mb-3' type="password" name="password" placeholder="password" value={ user.password} onChange={handleInputChange} required  />
            <button className='bg-rose-100 text-red-800 h-10 w-32 border-3 border-red-800' type='submit'>Log In</button>
        {error && <p>Error registering User: {error}</p>}
</form>
</div>
) 
};

export default UserLogin;