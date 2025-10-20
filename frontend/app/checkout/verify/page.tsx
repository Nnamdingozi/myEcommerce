
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { usePaystack } from '@/app/context/paystackContext';
import { VerifyTransactionResponse } from '@/app/lib/definition';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

// Define a type for the component's state
type VerificationStatus = 'loading' | 'success' | 'failed';

const VerificationContent = () => {
  const searchParams = useSearchParams();
  const { verifyPaystackPayment } = usePaystack();

  // --- REFACTORED STATE ---
  const [status, setStatus] = useState<VerificationStatus>('loading');
  const [details, setDetails] = useState<VerifyTransactionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const reference = searchParams.get('reference');

    if (!reference) {
      setError('No payment reference found.');
      setStatus('failed');
      return;
    }

    const verify = async () => {
      try {
        const result = await verifyPaystackPayment(reference);
        
        
        // Check the nested status property to determine the outcome.
        if (result && result.data && result.data.status === 'success') {
          setDetails(result);
          setStatus('success');
        } else {
          // If the status is not 'success', treat it as a failure.
          setError(result?.message || 'Payment was not successful.');
          setStatus('failed');
        }
      } catch (err: any) {
        setError(err.message || 'An unknown error occurred during verification.');
        setStatus('failed');
      }
    };

    verify();
  }, [searchParams, verifyPaystackPayment]);

  // --- RENDER BASED ON THE NEW, SIMPLE `status` STATE ---

  if (status === 'loading') {
    return (
      <Card className="w-full max-w-md">
        <CardHeader><CardTitle className="text-center">Verifying Your Payment</CardTitle></CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-4 p-10">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Please wait...</p>
        </CardContent>
      </Card>
    );
  }

  if (status === 'success' && details) {
    const { data } = details;
    return (
      <Card className="w-full max-w-md border-green-500">
        <CardHeader><CardTitle className="text-center text-green-600">Payment Successful!</CardTitle></CardHeader>
        <CardContent className="space-y-4 p-6">
          <div className="flex items-center justify-center"><CheckCircle className="h-12 w-12 text-green-500" /></div>
          <p className="text-center text-muted-foreground">Thank you! A confirmation has been sent to {data.customer.email}.</p>
          <div className="text-sm bg-muted p-4 rounded-md space-y-2">
            <div className="flex justify-between"><span>Amount Paid:</span> <span className="font-medium">NGN {(data.amount / 100).toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Reference:</span> <span className="font-mono">{data.reference}</span></div>
            <div className="flex justify-between"><span>Date:</span> <span className="font-medium">{new Date(data.paid_at).toLocaleString()}</span></div>
          </div>
          <Button asChild className="w-full mt-4"><Link href="/orderPages/orderDisplay">View Your Order Details</Link></Button>
        </CardContent>
      </Card>
    );
  }

  // This will catch both explicit failures and any other error.
  if (status === 'failed') {
     return (
       <Card className="w-full max-w-md border-destructive">
        <CardHeader><CardTitle className="text-center text-destructive">Payment Failed</CardTitle></CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-4 p-10">
          <XCircle className="h-12 w-12 text-destructive" />
          <p className="text-center text-muted-foreground">{error || 'Your payment could not be processed.'}</p>
          <Button asChild variant="outline" className="mt-4"><Link href="/cart">Return to Cart and Try Again</Link></Button>
        </CardContent>
      </Card>
    );
  }

  return null; 
};

// The main page component remains the same
export default function VerifyPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
      <Suspense fallback={<div>Loading...</div>}>
        <VerificationContent />
      </Suspense>
    </div>
  );
}