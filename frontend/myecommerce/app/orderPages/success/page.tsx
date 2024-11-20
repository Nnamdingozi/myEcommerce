// // import React, { useEffect, useState } from 'react';
// // import { useRouter } from 'next/router';
// // import { useOrderContext } from '@/app/context/orderContext';  // Adjust the import based on your actual context path
// // import { useUser } from '@/app/context/userContext';  // Adjust the import based on your actual context path

// // const SuccessPage = () => {
// //   const [isVerifying, setIsVerifying] = useState(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [message, setMessage] = useState('');
// //   const [successMessage, setSuccessMessage] = useState('');
  
// //   const { token } = useUser();  // Get the user token from context
// //   const { verifyPayment } = useOrderContext();  // Get the verifyPayment function from context
// //   const router = useRouter();
// //   const { orderId, reference } = router.query;  // Capture orderId and reference from URL query params
  
// //   useEffect(() => {
// //     const verifyTransaction = async (reference: string) => {
// //       if (!orderId || !reference ) {
// //         setError('Missing required information.');
// //         setIsVerifying(false);
// //         return;
// //       }

// //       try {
// //         const referenceString = Array.isArray(reference) ? reference[0] : reference;

// //         const result = await verifyPayment(referenceString);  // Call the verifyPayment function
// //         if (result && result.status === 'success') {
// //           setSuccessMessage('Your payment was successfully verified!');
// //           setMessage('Thank you for your order!');
// //           // Provide actions like viewing the order or continue shopping
// //         } else {
// //           setError('Unable to verify payment. Please try again later.');
// //           setMessage('Payment verification failed.');
// //         }
// //       } catch (err) {
// //         console.error('Error verifying payment:', err);
// //         setError('An error occurred while verifying the payment.');
// //         setMessage('An error occurred. Please try again later.');
// //       } finally {
// //         setIsVerifying(false);  // Stop loading spinner after the process
// //       }
// //       verifyTransaction(referenceString);
// //     };

  
// //   }, [orderId, reference, token,  router]);

// //   return (
// //     <div className="max-w-4xl mx-auto p-6">
// //       {isVerifying ? (
// //         <div className="text-center">
// //           <p>Verifying your payment...</p>
// //           {/* You can use a loading spinner here */}
// //         </div>
// //       ) : error ? (
// //         <div className="text-center text-red-500">
// //           <p>{message || error}</p>
// //         </div>
// //       ) : (
// //         <div className="text-center">
// //           <p className="text-lg font-bold text-green-500">{successMessage}</p>
// //           <p>{message}</p>
// //           <div className="mt-4">
// //             {/* Show options based on the result */}
// //             <button
// //               className="bg-green-500 text-white px-4 py-2 rounded mr-2"
// //               onClick={() => router.push(`/orderPages/order`)}  // Redirect to order
// //             >
// //               View Your Order
// //             </button>
// //             <button
// //               className="bg-blue-500 text-white px-4 py-2 rounded"
// //               onClick={() => router.push('/')}  // Redirect to home page
// //             >
// //               Go to Homepage
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default SuccessPage;




'use client';

import { useEffect, useState } from 'react';
import { useOrderContext } from '@/app/context/orderContext';
import { useUser } from '@/app/context/userContext'; // if you're using this later
import { useRouter } from 'next/navigation';

const SuccessPage = () => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [orderId, setOrderId] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const { verifyPayment } = useOrderContext();
  const router = useRouter();

  useEffect(() => {
    // Extract URL parameters only once when the component mounts
    const url = new URL(window.location.href);
    const extractedOrderId = url.searchParams.get('orderId');
    const extractedReference = url.searchParams.get('reference');

    if (extractedOrderId && extractedReference) {
      setOrderId(extractedOrderId);
      setReference(extractedReference);
    }
  }, []);

  useEffect(() => {
    // Run the payment verification only when orderId and reference are available
    if (orderId && reference) {
      const verifyTransaction = async () => {
        setIsVerifying(true);
        try {
          const result = await verifyPayment(reference);

          if (result && result.status === 'success') {
            setSuccessMessage('Your payment was successfully verified!');
            setMessage('Thank you for your order!');
          } else {
            setError('Unable to verify payment. Please try again later.');
            setMessage('Payment verification failed.');
          }
        } catch (err) {
          console.error('Error verifying payment:', err);
          setError('An error occurred while verifying the payment.');
          setMessage('An error occurred. Please try again later.');
        } finally {
          setIsVerifying(false);
        }
      };

      verifyTransaction();
    }
  }, [orderId, reference, verifyPayment]); // Dependencies updated to track orderId and reference

  return (
    <div className="max-w-4xl mx-auto p-6 h-screen">
      {isVerifying ? (
        <div className="text-center">
          <p>Verifying your payment...</p>
        </div>
      ) : error ? (
        <div className="text-center text-red-500">
          <p>{message || error}</p>
        </div>
      ) : (
        <div className="text-center h-1/2">
          <p className="text-lg font-bold text-green-500">{successMessage}</p>
          <p>{message}</p>
          <div className="mt-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              onClick={() => router.push('/orderPages/order')}
            >
              View Your Order
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => router.push('/')}
            >
              Go to Homepage
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessPage;
