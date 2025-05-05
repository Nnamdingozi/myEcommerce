
'use client';


import { Suspense } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { usePaystackContext } from '@/app/context/paystackContext';
import { useEffect, useState } from 'react';

const SuccessClient = () => {
 

  const router = useRouter();
  const { successMessage, isLoading, error, verifyPayment } = usePaystackContext();
  const searchParams = useSearchParams();
  const [transaction, setTransaction] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const reference = searchParams.get('reference');
    if (reference) {
      verifyPayment(reference).then((res) => {
        if (res?.transaction) {
          setTransaction(res.transaction);
        }
      }).finally(() => setIsVerifying(false));
    } else {
      setIsVerifying(false);
    }
  }, [searchParams, verifyPayment]);

  if (isLoading || isVerifying) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-lg font-semibold text-gray-700 animate-pulse">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-lg font-semibold text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!successMessage) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Payment Status</h1>
        <p className={`text-lg mb-6 ${successMessage.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
          {successMessage}
        </p>

        {transaction && (
          <div className="text-left text-gray-700">
            <p><strong>Reference:</strong> {transaction.reference}</p>
            <p><strong>Amount:</strong> ₦{(transaction.amount / 100).toFixed(2)}</p>
            <p><strong>Status:</strong> {transaction.status}</p>
            <p><strong>Message:</strong> {transaction.message}</p>
            <p><strong>Email:</strong> {transaction.customer_email}</p>
            <p><strong>Paid At:</strong> {new Date(transaction.paid_at).toLocaleString()}</p>
          </div>
        )}

        {successMessage.includes('successful') && (
          <button
            onClick={() => router.push('/orderPages/orderDisplay')}
            className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            View Orders
          </button>
        )}
      </div>
    </div>
  );
};

// Export the server component that wraps the client component in Suspense
export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <SuccessClient />
    </Suspense>
  );
}
