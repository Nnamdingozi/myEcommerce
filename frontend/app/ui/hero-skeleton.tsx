// app/ui/hero-skeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export const HeroSkeleton = () => {
  return (
    <div className="relative w-full max-w-7xl mx-auto my-12 px-4">
      <Skeleton className="w-full h-80 md:h-96 rounded-lg" />
    </div>
  );
};