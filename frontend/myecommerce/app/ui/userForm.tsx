import { User } from '@/app/lib/definition';

import { useState } from 'react';

interface UserFormProps {
    onSubmit: (user: User) => Promise<void>
}

const UserForm : React.FC<UserFormProps> = ({ onSubmit }) => {
const [user, setUser] = useState({ username: '', email: '', phone: '', password: '', country_code: ''});
const [error, setError] = useState< string | null>(null);
const passwordCriteria = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [e.target.name]: e.target.value});
}

const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
        await onSubmit(user);
        console.log('User submitted to database')

    } catch (err){
        setError(`User Registration failed: ${err}`);
        console.error(error);
    }

};

return (
    <fieldset className='bg-gray-200 w-[60%] h-screen border-2 border-red-800 m-auto flex flex-col align-middle'>
        <form className='p-auto border-2 border-rose-300 w-[80%]'>
            <input className='h-10 w-[80%] mb-2 border-2 border-rose-300' type="text" name="username" placeholder="Username" value={user.username} onChange={handleInputChange} required  />
            <input className='h-10 w-[80%] mb-2 border-2 border-rose-300 ' type="email" name="email" placeholder="Email" value={user.email} onChange={handleInputChange} required  />
            <input  className='h-10 w-[80%] mb-2 border-2 border-rose-300 l'type="tel" name="phone" placeholder="Phone Number" value={user.phone} onChange={handleInputChange} required  />
            <input className='h-10 w-[80%] mb-2 border-2 border-rose-300 ' type="password" name="password" placeholder="password" value={ user.password} onChange={handleInputChange} required  />
            <input className='h-10 w-[80%] mb-2 border-2 border-rose-300 ' type="text" name="country_code" placeholder="country code" value={user.country_code} onChange={handleInputChange} />
        </form>
        <button className='bg-rose-100 text-red-800 h-4 w-6' type='submit' onClick={handleSubmit}>Register</button>
        {error && <p>Error registering User: {error}</p>}
    </fieldset>
)
};

export default UserForm;