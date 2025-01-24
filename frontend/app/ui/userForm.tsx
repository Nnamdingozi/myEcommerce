
'use client';

import { User } from '@/app/lib/definition';
import { useState } from 'react';
import * as yup from 'yup';

interface UserFormProps {
  onSubmit: (userInput: User) => Promise<void>;
}

// Yup schema for validation
const registrationSchema = yup.object({
  username: yup
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(10, 'Username must not exceed 10 characters')  // Adjusted max length to 10
    .required('Username is required'),
  
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),

  phone: yup
    .string()
    .matches(/^[0-9]{10,15}$/, 'Phone number must be between 10 and 15 digits')
    .required('Phone number is required'),

  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('Password is required'),

  country_code: yup
    .string()
    .required('Please select a country code'),  // Country code is required and selected from dropdown
});

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const [userInput, setUserInput] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    country_code: '',
  });
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const validateField = async (fieldName: keyof typeof userInput) => {
    try {
      await registrationSchema.validateAt(fieldName, userInput);  // Use validateAt instead of yup.reach
      setError((prev) => ({ ...prev, [fieldName]: '' }));
    } catch (err: any) {
      if (err instanceof yup.ValidationError) {
        setError((prev) => ({ ...prev, [fieldName]: err.message }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registrationSchema.validate(userInput, { abortEarly: false });
      await onSubmit(userInput);
      setUserInput({ username: '', email: '', phone: '', password: '', country_code: '' });
      setError({});
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          newErrors[error.path || 'general'] = error.message;
        });
        setError(newErrors);
      } else {
        setError({ general: 'An error occurred, please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="h-auto p-8 border border-gray-200 w-full max-w-md mx-auto rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <h2 className="font-semibold text-center text-red-800 mb-4">Register a new account</h2>

      <div className="mb-4">
        <label htmlFor="username" className="sr-only">Username</label>
        <input
          id="username"
          className="h-10 w-full p-2 border border-rose-300 rounded focus:outline-none focus:border-red-600 text-black"
          type="text"
          name="username"
          placeholder="Username"
          value={userInput.username}
          onChange={handleInputChange}
          onBlur={() => validateField('username')}
          aria-invalid={!!error.username}
          aria-describedby="username-error"
          required
        />
        {error.username && <p id="username-error" className="text-red-600 text-sm">{error.username}</p>}
       
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="sr-only">Email</label>
        <input
          id="email"
          className="h-10 w-full p-2 border border-rose-300 rounded focus:outline-none focus:border-red-600 text-black"
          type="email"
          name="email"
          placeholder="Email"
          value={userInput.email}
          onChange={handleInputChange}
          onBlur={() => validateField('email')}
          aria-invalid={!!error.email}
          aria-describedby="email-error"
          required
        />
        {error.email && <p id="email-error" className="text-red-600 text-sm">{error.email}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="phone" className="sr-only">Phone Number</label>
        <input
          id="phone"
          className="h-10 w-full p-2 border border-rose-300 rounded focus:outline-none focus:border-red-600 text-gray-700"
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={userInput.phone}
          onChange={handleInputChange}
          onBlur={() => validateField('phone')}
          aria-invalid={!!error.phone}
          aria-describedby="phone-error"
          required
        />
        {error.phone && <p id="phone-error" className="text-red-600 text-sm">{error.phone}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="sr-only">Password</label>
        <input
          id="password"
          className="h-10 w-full p-2 border border-rose-300 rounded focus:outline-none focus:border-red-600 text-gray-700"
          type="password"
          name="password"
          placeholder="Password"
          value={userInput.password}
          onChange={handleInputChange}
          onBlur={() => validateField('password')}
          aria-invalid={!!error.password}
          aria-describedby="password-error"
          required
        />
        {/* <small className="text-gray-500">Password must include uppercase, lowercase, number, and special character.</small> */}
        {error.password && <p id="password-error" className="text-red-600 text-sm">{error.password}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="country_code" className="sr-only">Country Code</label>
        <select
          id="country_code"
          className="h-10 w-full p-2 border border-rose-300 rounded focus:outline-none focus:border-red-600 text-gray-700"
          name="country_code"
          value={userInput.country_code}
          onChange={handleInputChange}
          onBlur={() => validateField('country_code')}
          aria-invalid={!!error.country_code}
          aria-describedby="country_code-error"
          required
        >
          <option value="" disabled>Select Country Code</option>
          <option value="+1">United States (+1)</option>
          <option value="+44">United Kingdom (+44)</option>
          <option value="+91">India (+91)</option>
          <option value="+234">Nigeria (+234)</option>
          <option value="+61">Australia (+61)</option>
        </select>
        {error.country_code && <p id="country_code-error" className="text-red-600 text-sm">{error.country_code}</p>}
      </div>

      <button
        className="bg-rose-100 text-red-800 font-semibold h-12 w-full rounded mt-6 hover:bg-red-800 hover:text-rose-100"
        type="submit"
        disabled={loading}
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};

export default UserForm;


