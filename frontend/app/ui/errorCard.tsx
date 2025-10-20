// app/ui/error-card.tsx

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertTriangle } from 'lucide-react';

// 1. Define the props interface for the component
interface ErrorCardProps {
  /** The specific error message to display in the details section. */
  errorMessage: string;
  /** An optional, more user-friendly title. Defaults to "An Error Occurred". */
  title?: string;
  /** An optional, more user-friendly message for the main content. */
  friendlyMessage?: string;
}

// 2. Add the types to the component's function signature
export const ErrorCard: React.FC<ErrorCardProps> = ({ 
  errorMessage, 
  title = "An Error Occurred", 
  friendlyMessage = "We're sorry, but something went wrong. Please try refreshing the page or check back later." 
}) => {
  return (
    <div className="flex items-center justify-center min-h-[50vh] bg-background p-4">
      <Card className="w-full max-w-lg border-destructive bg-destructive/5">
        <CardHeader className="flex flex-row items-center gap-4">
          <AlertTriangle className="h-8 w-8 text-destructive flex-shrink-0" />
          <CardTitle className="text-destructive">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {friendlyMessage}
          </p>
          {/* Only render the details if an errorMessage is actually provided */}
          {errorMessage && (
            <div className="mt-4 text-xs bg-muted p-3 rounded-md">
              <p className="font-semibold">Error Details:</p>
              <p className="font-mono break-words">{errorMessage}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};