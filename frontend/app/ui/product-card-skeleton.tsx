// app/ui/product-card-skeleton.tsx
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ProductCardSkeleton = () => {
  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="p-0">
        {/* Image Placeholder */}
        <Skeleton className="h-48 w-full" />
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        {/* Title Placeholder */}
        <Skeleton className="h-6 w-3/4 mb-2" />
        {/* Rating Placeholder */}
        <Skeleton className="h-4 w-1/2 mb-4" />
        {/* Description Placeholder */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full mt-2" />
        <Skeleton className="h-4 w-5/6 mt-2" />
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        {/* Price Placeholder */}
        <Skeleton className="h-8 w-1/3" />
        {/* Button Placeholder */}
        <Skeleton className="h-9 w-24 rounded-md" />
      </CardFooter>
    </Card>
  );
};