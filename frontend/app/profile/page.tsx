// app/profile/page.tsx
'use client';

import { useEffect } from 'react';
import { useUser } from '@/app/context/userContext';
import { useRouter } from 'next/navigation';

// --- Import UI Components ---
import UserProfileDisplay from '@/app/ui/userProfileDisplay'; // The "dumb" display component
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorCard } from '@/app/ui/errorCard';

// A simple skeleton for the profile page
const ProfilePageSkeleton = () => (
  <div className="container mx-auto max-w-2xl py-12 pt-24">
    <div className="space-y-8">
      <div className="flex items-center gap-6">
        <Skeleton className="h-24 w-24 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-5 w-64" />
        </div>
      </div>
      <Skeleton className="h-48 w-full rounded-lg" />
    </div>
  </div>
);

const ProfilePage: React.FC = () => {
  // 1. Get the user and loading state from the context
  const { user, isLoading, error } = useUser(); // Assuming your context exposes an error state
  const router = useRouter();

  // 2. This effect protects the route from unauthenticated users
  useEffect(() => {
    // If the initial user check is complete and there is no user, redirect to login
    if (!isLoading && !user) {
      router.replace('/user/login?redirect=/profile');
    }
  }, [user, isLoading, router]);

  // --- 3. Handle Loading State ---
  // Show a skeleton while the initial user session is being verified.
  if (isLoading) {
    return <ProfilePageSkeleton />;
  }

  // --- 4. Handle Error State  ---
  if (error) {
    return <ErrorCard errorMessage={error} title="Could Not Load Profile" />;
  }

  // --- 5. Handle the case where the user is null after loading  ---
  if (!user) {
  
    return <ProfilePageSkeleton />;
  }

  // --- 6. Success State ---

  return (
    <UserProfileDisplay user={user} />
  );
};

export default ProfilePage;