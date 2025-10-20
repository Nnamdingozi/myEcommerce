// app/ui/user-profile-display.tsx
'use client';

import { UserProfile } from '@/app/lib/definition';
import { useUser } from '@/app/context/userContext';

// --- Import UI Components ---
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Phone, MapPin, LogOut } from 'lucide-react';

interface UserProfileDisplayProps {
  user: UserProfile;
}

const UserProfileDisplay: React.FC<UserProfileDisplayProps> = ({ user }) => {
  const { logout } = useUser(); 

  return (
    <div className="container mx-auto max-w-4xl py-12 pt-24 md:pt-32">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* --- Left Column: Profile Card & Actions --- */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src="/avatars/01.png" alt={user.username ?? 'User Avatar'} />
                <AvatarFallback className="text-3xl">
                  {user.username?.[0]?.toUpperCase() ?? 'U'}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">{user.username}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button variant="outline" className="w-full">Edit Profile</Button>
              <Button variant="destructive" className="w-full" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* --- Right Column: Detailed Information --- */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
              <CardDescription>Your personal information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center">
                <User className="h-5 w-5 text-muted-foreground mr-4" />
                <div className="flex-grow">
                  <p className="text-sm text-muted-foreground">Username</p>
                  <p className="font-medium">{user.username}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-muted-foreground mr-4" />
                <div className="flex-grow">
                  <p className="text-sm text-muted-foreground">Email Address</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-muted-foreground mr-4" />
                <div className="flex-grow">
                  <p className="text-sm text-muted-foreground">Phone Number</p>
                  <p className="font-medium">{user.phone}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-muted-foreground mr-4" />
                <div className="flex-grow">
                  <p className="text-sm text-muted-foreground">Country Code</p>
                  <p className="font-medium">{user.countryCode}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfileDisplay;