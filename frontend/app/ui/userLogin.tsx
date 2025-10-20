'use client';

import { useState } from 'react';
import { LoginRequest } from '@/app/lib/definition';
import Link from 'next/link';

// --- Import shadcn/ui components and lucide-react icons ---
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Github, Loader2, Eye, EyeOff } from 'lucide-react'; 

interface UserLoginProps {
  onSubmit: (userInput: LoginRequest) => Promise<void>;
  onGitHubLogin: () => void;
}

const UserLogin: React.FC<UserLoginProps> = ({ onSubmit, onGitHubLogin }) => {
  const [userInput, setUserInput] = useState<LoginRequest>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInput.email || !userInput.password) {
      setError('Both email and password are required.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await onSubmit(userInput);
    } catch (err: any) {
      setError(err.message || 'User login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center max-h-screen bg-background px-4">
  
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Log In</CardTitle>
          <CardDescription>Enter your email below to log in to your account.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* The main form now uses a simple vertical gap */}
          <form onSubmit={handleSubmit} className="grid gap-4">
            
            {/* --- EMAIL FIELD --- */}
       
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                <Label htmlFor="email" className="md:text-right">Email</Label>
                <div className="md:col-span-2">
                  <Input
                id="email" type="email" name="email" placeholder="m@example.com"
                value={userInput.email} onChange={handleInputChange}
                required disabled={loading}
              />
            </div>
            </div>
            
            {/* --- PASSWORD FIELD --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                <Label htmlFor="password" className="md:text-right">Password</Label>
                <div className="relative md:col-span-2">
                  <Input
                  id="password" type={showPassword ? 'text' : 'password'} name="password"
                  placeholder="••••••••" value={userInput.password} onChange={handleInputChange}
                  required disabled={loading} className="pr-10"
                />
                <Button
                  type="button" variant="ghost" size="icon"
                  className="absolute top-1/2 right-2 -translate-y-1/2 h-7 w-7 text-muted-foreground"
                  onClick={() => setShowPassword((prev) => !prev)} disabled={loading}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              </div>
              <div className="flex items-center justify-between">
                
                <Link href="/forgot-password" passHref>
                  <span className="text-sm underline hover:text-primary cursor-pointer">Forgot password?</span>
                </Link>
          
            
            </div>
            
            {error && <p className="text-sm font-medium text-destructive text-center">{error}</p>}
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign in
            </Button>
          </form>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          
          <Button variant="outline" className="w-full" onClick={onGitHubLogin} disabled={loading}>
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </CardContent>
        <CardFooter className="justify-center text-sm text-muted-foreground">
          Don&apos;t have an account?&nbsp;
          <Link href="/user/register" passHref>
             <span className="underline hover:text-primary cursor-pointer">Sign up</span>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserLogin;