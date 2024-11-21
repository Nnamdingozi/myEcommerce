'use client'

import { User } from '@/app/lib/definition';
import { useState } from 'react';

interface UserFormProps {
  onSubmit: (userInput: User) => Promise<void>;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const [userInput, setUserInput] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    country_code: '',
  });
  const [error, setError] = useState<string | null>(null);

  const passwordCriteria = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordCriteria.test(userInput.password)) {
      setError('Password must be at least 8 characters long and include uppercase, lowercase, digit, and special character.');
      return;
    }
    if (userInput.phone.length < 11) {
      setError('Phone number must be at least 11 digits.');
      return;
    }
    if (userInput.country_code === '') {
      setError('Please select a country code.');
      return;
    }

    try {
      await onSubmit(userInput);
      setError(null);
    } catch (err) {
      setError(`User Registration failed: ${err}`);
      console.error(error);
    }
  };

  return (
    <form className="h-auto p-8 border border-gray-200 w-[90%] max-w-md mx-auto rounded-lg shadow-md" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold text-center text-red-800 mb-4">Register</h2>

      <input
        className="h-12 w-full mb-4 p-2 border border-rose-300 rounded focus:outline-none focus:border-red-600 text-black"
        type="text"
        name="username"
        placeholder="Username"
        value={userInput.username}
        onChange={handleInputChange}
        required
      />

      <input
        className="h-12 w-full mb-4 p-2 border border-rose-300 rounded focus:outline-none focus:border-red-600 text-black"
        type="email"
        name="email"
        placeholder="Email"
        value={userInput.email}
        onChange={handleInputChange}
        required
      />

      <input
        className="h-12 w-full mb-4 p-2 border border-rose-300 rounded focus:outline-none focus:border-red-600 text-gray-700"
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={userInput.phone}
        onChange={handleInputChange}
        required
      />

      <input
        className="h-12 w-full mb-4 p-2 border border-rose-300 rounded focus:outline-none focus:border-red-600 text-gray-700"
        type="password"
        name="password"
        placeholder="Password"
        value={userInput.password}
        onChange={handleInputChange}
        required
      />

      <select
        className="h-12 w-full mb-4 p-2 border border-rose-300 rounded focus:outline-none focus:border-red-600 text-gray-700"
        name="country_code"
        value={userInput.country_code}
        onChange={handleInputChange}
        required
      >
        <option value="">Select Country Code</option>
        <option value="+1">United States (+1)</option>
        <option value="+44">United Kingdom (+44)</option>
        <option value="+91">India (+91)</option>
        <option value="+234">Nigeria (+234)</option>
        <option value="+61">Australia (+61)</option>
      </select>

      <button className="bg-rose-100 text-red-800 font-semibold h-12 w-full rounded mt-6 hover:bg-red-800 hover:text-rose-100" type="submit">
        Register
      </button>

      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
    </form>
  );
};

export default UserForm;
