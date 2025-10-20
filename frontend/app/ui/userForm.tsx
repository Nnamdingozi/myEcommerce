'use client';

import { useState } from 'react';
import * as yup from 'yup';
import { RegistrationPayload } from '@/app/lib/definition'; // Use our API payload type
import Link from 'next/link';

// --- Import shadcn/ui components and lucide-react icons ---
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

interface UserFormProps {
  onSubmit: (userInput: RegistrationPayload) => Promise<void>;
}

// Yup schema with camelCase for form state alignment
const registrationSchema = yup.object({
  username: yup.string().min(3).required('Username is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone: yup.string().matches(/^[0-9]{10,15}$/, 'Enter a valid phone number').required('Phone is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  countryCode: yup.string().required('Country is required'),
});

// Define the shape of our form state and errors
type FormState = yup.InferType<typeof registrationSchema>;
type FormErrors = Partial<Record<keyof FormState | 'general', string>>;

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const [userInput, setUserInput] = useState<FormState>({
    username: '',
    email: '',
    phone: '',
    password: '',
    countryCode: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };
  
  // Special handler for the shadcn/ui Select component
  const handleCountryChange = (value: string) => {
    setUserInput({ ...userInput, countryCode: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await registrationSchema.validate(userInput, { abortEarly: false });
      await onSubmit(userInput);
    } catch (err: any) {
      if (err instanceof yup.ValidationError) {
        const newErrors: FormErrors = {};
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path as keyof FormState] = error.message;
          }
        });
        setErrors(newErrors);
      } else {
        // Handle server-side errors passed from the page component
        setErrors({ general: err.message || 'An unknown error occurred.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
  
      <div className="flex items-center justify-center min-h-screen bg-background px-4">
 
        <Card className="w-full max-w-lg"> 
          <CardHeader>
            <CardTitle className="text-2xl">Create an Account</CardTitle>
            <CardDescription>Enter your details below to create your new account.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-6"> {/* Increased gap for better spacing */}
              
              {/* --- USERNAME FIELD --- */}
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                <Label htmlFor="username" className="md:text-right">Username</Label>
                <div className="md:col-span-2">
                  <Input
                    id="username" name="username" placeholder="johnny"
                    value={userInput.username} onChange={handleInputChange} disabled={loading}
                  />
                  {errors.username && <p className="text-sm text-destructive mt-1">{errors.username}</p>}
                </div>
              </div>
  
              {/* --- EMAIL FIELD --- */}
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                <Label htmlFor="email" className="md:text-right">Email</Label>
                <div className="md:col-span-2">
                  <Input
                    id="email" name="email" type="email" placeholder="m@example.com"
                    value={userInput.email} onChange={handleInputChange} disabled={loading}
                  />
                  {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                </div>
              </div>
  
              {/* --- PHONE FIELD --- */}
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                <Label htmlFor="phone" className="md:text-right">Phone Number</Label>
                <div className="md:col-span-2">
                  <Input
                    id="phone" name="phone" type="tel" placeholder="8123456789"
                    value={userInput.phone} onChange={handleInputChange} disabled={loading}
                  />
                  {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                </div>
              </div>
              
              {/* --- PASSWORD FIELD --- */}
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                <Label htmlFor="password" className="md:text-right">Password</Label>
                <div className="relative md:col-span-2">
                  <Input
                    id="password" name="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••"
                    value={userInput.password} onChange={handleInputChange} disabled={loading} className="pr-10"
                  />
                  <Button
                    type="button" variant="ghost" size="icon"
                    className="absolute top-1/2 right-2 -translate-y-1/2 h-7 w-7 text-muted-foreground"
                    onClick={() => setShowPassword((prev) => !prev)} disabled={loading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {/* Place error message here */}
                <div className="md:col-start-2 md:col-span-2">
                  {errors.password && <p className="text-sm text-destructive -mt-3">{errors.password}</p>}
                </div>
              </div>
  
              {/* --- COUNTRY FIELD --- */}
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                  <Label htmlFor="countryCode" className="md:text-right">Country</Label>
                  <div className="md:col-span-2">
                      <Select name="countryCode" onValueChange={handleCountryChange} value={userInput.countryCode} disabled={loading}>
                          <SelectTrigger>
                              <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectItem value="+1">United States (+1)</SelectItem>
                              <SelectItem value="+44">United Kingdom (+44)</SelectItem>
                              <SelectItem value="+91">India (+91)</SelectItem>
                              <SelectItem value="+234">Nigeria (+234)</SelectItem>
                              <SelectItem value="+61">Australia (+61)</SelectItem>
                          </SelectContent>
                      </Select>
                      {errors.countryCode && <p className="text-sm text-destructive mt-1">{errors.countryCode}</p>}
                  </div>
              </div>
              
              {errors.general && <p className="text-sm font-medium text-destructive text-center">{errors.general}</p>}
              
              <Button type="submit" className="w-full mt-2" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create account
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/user/login" passHref>
              <span className="underline">Log in</span>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
    }
export default UserForm;