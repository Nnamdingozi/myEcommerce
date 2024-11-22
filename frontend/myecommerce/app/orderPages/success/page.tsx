'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useOrderContext } from '@/app/context/orderContext';  

const SuccessPage = () => {
  const [orderId, setOrderId] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const { verifyPayment, error, successMessage} = useOrderContext();
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();


  // Extract URL parameters on initial mount
  useEffect(() => {
    const url = new URL(window.location.href);
    const extractedOrderId = url.searchParams.get('orderId');
    const extractedReference = url.searchParams.get('reference');

    if (extractedOrderId && extractedReference) {
      console.log('Reference extracted:', extractedReference);
      console.log('OrderId extracted:', extractedOrderId);

      setOrderId(extractedOrderId);
      setReference(extractedReference);
    } else {
      console.error('Invalid payment verification URL. Missing orderId or reference.');
    }
  }, []); // Runs only once on initial mount

 
  // Handle payment verification on orderId and reference change
  useEffect(() => {
    const verifyTransaction = async () => {
      if (!orderId || !reference) return;

      try {
        console.log('Verifying payment for reference:', reference);

        const result = await verifyPayment(reference); // `result` is already the response.data
        console.log('Verification result:', result);
        setMessage('payment was successfully verified!Thank you for your order!')
   
      } catch (err) {
        console.error('Error during verification:', err);
        // setError('An error occurred while verifying the payment.');
        setMessage('Please try again later.');
      }
    };

    if (orderId && reference) {
      verifyTransaction();
    }
  }, [orderId, reference, verifyPayment]);

  const handleRedirect = (path: string) => {
    router.push(path); // Redirect to the given path (homepage or order page)
  };

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  // Show success message and options to redirect
  return (
    <div className="text-center h-auto mt-12 py-24 border,">
        <p className="text-lg font-bold text-green-500">{message}</p>

    
      <div className="mt-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          onClick={() => handleRedirect('/orderPages/orderDisplay')} // Redirect to order page on click
        >
          View Your Order
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => handleRedirect('/home')} // Redirect to homepage on click
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
