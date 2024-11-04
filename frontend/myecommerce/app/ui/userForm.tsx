'use client'

import { User } from '@/app/lib/definition';
// import { useUser } from '../context/userContext';
import { useState } from 'react';

interface UserFormProps {
    onSubmit: (userInput: User) => Promise<{id: number; username: string; email: string }>
}

const UserForm : React.FC<UserFormProps> = ({ onSubmit }) => {
const [userInput, setUserInput] = useState({ username: '', email: '', phone: '', password: '', country_code: ''});
const [error, setError] = useState< string | null>(null);
// const { setUser } = useUser();
const passwordCriteria = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({...userInput, [e.target.name]: e.target.value});
}

const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
         await onSubmit(userInput);
        // setUser({name: createdUser.username, email: createdUser.email, id: createdUser.id, })
        // console.log('User submitted to database and stored globally:', createdUser);
    } catch (err){
        setError(`User Registration failed: ${err}`);
        console.error(error);
    }

};

return (
    
        <form className='p-auto border-2 w-[80%] rounded h-screen mx-auto'  onSubmit={handleSubmit}>
            <input className='h-10 w-[80%] mb-2 mt-4 border-2 border-rose-300 rounded' type="text" name="username" placeholder="Username" value={userInput.username} onChange={handleInputChange} required  />
            <input className='h-10 w-[80%] mb-2 border-2 border-rose-300 rounded ' type="email" name="email" placeholder="Email" value={userInput.email} onChange={handleInputChange} required  />
            <input  className='h-10 w-[80%] mb-2 border-2 border-rose-300 rounded'type="tel" name="phone" placeholder="Phone Number" value={userInput.phone} onChange={handleInputChange} required  />
            <input className='h-10 w-[80%] mb-2 border-2 border-rose-300 rounded' type="password" name="password" placeholder="password" value={ userInput.password} onChange={handleInputChange} required  />
            <input className='h-10 w-[80%] mb-2 border-2 border-rose-300 rounded' type="text" name="country_code" placeholder="country code" value={userInput.country_code} onChange={handleInputChange} />
            <button className='bg-rose-100 text-red-800 h-10 w-[50%] rounded mt-6 focus:bg-red-800 focus:text-rose-100' type='submit'>Register</button>
        {error && <p>Error registering User: {error}</p>}
        </form>
  
)
};

export default UserForm;