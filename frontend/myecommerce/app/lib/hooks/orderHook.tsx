
// import { createOrder, fetchUserOrder, fetchOrderById, initializePaystack, verifyPaystack } from '@/app/lib/data';
// import { Order, Paystack, VerifyTransactionResponse } from '@/app/lib/definition';

// export const orderHookLogic = (
//   setOrder: React.Dispatch<React.SetStateAction<Order | null>>,
//   setUserOrder: React.Dispatch<React.SetStateAction<Order[] | null>>,
//   setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
//   setError: React.Dispatch<React.SetStateAction<string | null>>,
//   setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>,
//   setIsVerifying: React.Dispatch<React.SetStateAction<boolean>>,
// ) => {

//   const createNewOrderHook = async (
//     token: string,
//     paymentMtd: string,
//     shippingAddy: string,
//     shippingMtd: string,
//     curr: string
//   ): Promise<{ orderId: number } | null> => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const newOrder = await createOrder(token, paymentMtd, shippingAddy, shippingMtd, curr);
//       if (newOrder && newOrder.orderId) {
//         const orderValues: Order | null = await getUserOrderByIdHook(token, newOrder.orderId);
//         console.log('Fetched order values in orderHook:', orderValues);
//         if (orderValues && orderValues.id !== undefined) {
//           setSuccessMessage(orderValues.payment_method === 'Cash' ? 'Order successfully created!' : 'Redirecting to paystack');
//           setOrder(orderValues);
//           console.log('new order in orderContext, ', orderValues);
//           return { orderId: orderValues.id };
//         }
//       } else {
//         setError('Order creation failed');
//         return null;
//       }
//     } catch (error: any) {
//       console.error('Error creating order:', error);
//       setError(error?.message || 'Failed to create order');
//       return null;
//     } finally {
//       setIsLoading(false);
//     }
//     return null;
//   };

//   const getUserOrderHook = async (token: string) => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const userOrders = await fetchUserOrder(token);
//       setUserOrder(userOrders);
//       return userOrders;
//     } catch (error: any) {
//       console.error('Error fetching user orders:', error);
//       setError(error.message || 'Failed to fetch user orders');
//       return null;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getUserOrderByIdHook = async (token: string, orderId: number) => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const userOrderById = await fetchOrderById(token, orderId);
//       setOrder(userOrderById);
//       return userOrderById;
//     } catch (error: any) {
//       console.error('Error fetching order by ID:', error);
//       setError(error.message || 'Failed to fetch order details');
//       return null;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const createPaystackHook = async (orderId: number) => {
//     console.log('orderID in orderContext:', orderId);
//     setIsLoading(true);
//     setError(null);
//     try {
//       const initializePay: Paystack | null = await initializePaystack(orderId);
//       console.log('id passed to initialize pay in createPaystackHook:', orderId);
//       console.log('data after initialize pay in order hook:', initializePay);
//       return initializePay;
//     } catch (error: any) {
//       console.error('Error initializing Paystack:', error);
//       setError(error.message || 'An error occurred while initializing payment.');
//       return null;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const verifyPaystackHook = async (reference: string) => {
//     setIsVerifying(true);
//     setError(null);
//     try {
//       const verifyPay = await verifyPaystack(reference);
//       if (verifyPay) {
//         console.log('Reference data after verifyPaystack in order hook:', verifyPay);
//         setSuccessMessage('Payment verification was successful')
//         return verifyPay;
//       }
//     } catch (error: any) {
//       console.error('Error verifying Paystack transaction:', error);
//       setError(error.message || 'An error occurred while verifying payment.');
//       return null;
//     } finally {
//       setIsVerifying(false);
//       setIsLoading(false);
//     }
//   };

//   return { createNewOrderHook, getUserOrderHook, getUserOrderByIdHook, createPaystackHook, verifyPaystackHook };
// };








// import { createOrder, fetchUserOrder, fetchOrderById, initializePaystack, verifyPaystack } from '@/app/lib/data'
// import { Order, Paystack, VerifyTransactionResponse } from '@/app/lib/definition'

// interface NewOrder {
//    id: number;
//    payment_method: string
// };





// export const orderHookLogic = (
//    setOrder: React.Dispatch<React.SetStateAction<Order | null>>,
//    setUserOrder: React.Dispatch<React.SetStateAction<Order[] | null>>,
//    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
//    setError: React.Dispatch<React.SetStateAction<string | null>>,
//    setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>,
//   //  setShowOrderDetails: React.Dispatch<React.SetStateAction<boolean>>,
//    setIsVerifying: React.Dispatch<React.SetStateAction<boolean>>,
//    ) => {

//    const createNewOrderHook = async(
//       token: string,
//       paymentMtd: string,
//        shippingAddy: string,
//        shippingMtd: string,
//         curr: string
//         ): Promise<{orderId: number} | null> => {

//          setIsLoading(true);
//       setError(null);

// try {
//    const newOrder = await createOrder( token, paymentMtd, shippingAddy, shippingMtd, curr)
//    if (newOrder && newOrder.orderId) {
//       const orderValues: Order | null = await getUserOrderByIdHook(token, newOrder.orderId);
//       console.log('Fetched order values in orderHook:', orderValues);
//       if(orderValues && orderValues.id  !== undefined) {
//          setSuccessMessage(orderValues.payment_method === 'Cash' ? 'Order successfully created!' : 'Redirecting to paystack');
//          setOrder(orderValues);
//          console.log('new order in orderContext, ', orderValues)
//          return { orderId: orderValues.id };
//       }

      
//    } else {
//       setError('order creation failed');
//       return null;
//    }


// } catch (error: any) {
//    console.error('Error creating order:', error);
//    setError(error?.message || 'Failed to create order');
//    return null
// } finally {
//    setIsLoading(false);
// }
// return null
//  };

// const getUserOrderHook = async( token: string,) => {
//    setIsLoading(true);
//    setError(null);
 
//         try {
//             const userOrders = await fetchUserOrder(token);
//             setUserOrder(userOrders);
//             return userOrders;
//         } catch (error: any) {
//             setError(error)

//         } finally {
//             setIsLoading(false);
//         }

//         return null

// };


// const getUserOrderByIdHook = async( token: string, orderId: number) => {
// setIsLoading(true);
// setError(null);

// try {
//    const userOrderById = await fetchOrderById(token, orderId);
//    setOrder(userOrderById);
//    return userOrderById;
// } catch (error: any) {
//    setError(error)

// } finally {
//    setIsLoading(false);
// }

// return null



// };


// const createPaystackHook = async (orderId: number) => {
//    console.log('orderID in orderContext;', orderId)
//    setIsLoading(true);
//    setError(null)
//    try {
//       const initializePay: Paystack | null = await initializePaystack(orderId);
//       console.log('id passed to initialize pay in createPaystackHoo:', orderId)
//       console.log('data after initialze pay in order hook:', initializePay)
//       return initializePay;
//    } catch (error: any) {
//       console.error('Error initializing Paystack:', error);
//       setError(error.message || 'An error occurred while initializing payment.');

//    } finally {
//       setIsLoading(false);
//    }

//    return null
// };




// const verifyPaystackHook = async (reference: string): Promise<VerifyTransactionResponse | null> => {
//     setIsVerifying(true);  // Mark as verifying

//    setIsLoading(true);
//    setError(null);

//    try {
//       const verifyPay = await verifyPaystack(reference);
//       if (verifyPay) {
//          console.log('reference data after verifyPaystack in order hook:', verifyPay);
//          return verifyPay;
//       }
//    } catch (error: any) {
//       console.error('Error verifying Paystack transaction:', error);
//       setError(error.message || 'An error occurred while verifying payment.');
//    } finally {
//       setIsLoading(false);
//       setIsVerifying(false); // Reset after verification attempt
//    }

//    return null;
// };



// return { createNewOrderHook, getUserOrderHook, getUserOrderByIdHook, createPaystackHook, verifyPaystackHook};
//    };



   
import {
   createOrder,
   fetchUserOrder,
   fetchOrderById,
   initializePaystack,
   verifyPaystack,
 } from '@/app/lib/data';
 import { Order, Paystack, VerifyTransactionResponse } from '@/app/lib/definition';
 
 export const orderHookLogic = () => {
   const createNewOrderHook = async (
     token: string,
     paymentMtd: string,
     shippingAddy: string,
     shippingMtd: string,
     curr: string
   ): Promise<{ orderId: number } | null> => {
     try {
       const newOrder = await createOrder(token, paymentMtd, shippingAddy, shippingMtd, curr);
 
       if (newOrder?.orderId) {
         const orderValues = await getUserOrderByIdHook(token, newOrder.orderId);
         return orderValues?.id ? { orderId: orderValues.id } : null;
       }
 
       return null;
     } catch (error: any) {
       console.error('Error creating order:', error);
       throw new Error(error?.message || 'Failed to create order');
     }
   };
 
   const getUserOrderHook = async (token: string): Promise<Order[] | null> => {
     try {
       return await fetchUserOrder(token);
     } catch (error: any) {
       console.error('Error fetching user orders:', error);
       throw new Error(error?.message || 'Failed to fetch user orders');
     }
   };
 
   const getUserOrderByIdHook = async (token: string, orderId: number): Promise<Order | null> => {
     try {
       return await fetchOrderById(token, orderId);
     } catch (error: any) {
       console.error('Error fetching order by ID:', error);
       throw new Error(error?.message || 'Failed to fetch order details');
     }
   };
 
   const createPaystackHook = async (orderId: number): Promise<Paystack | null> => {
     try {
       return await initializePaystack(orderId);
     } catch (error: any) {
       console.error('Error initializing Paystack:', error);
       throw new Error(error?.message || 'An error occurred while initializing payment');
     }
   };
 
   const verifyPaystackHook = async (reference: string): Promise<VerifyTransactionResponse | null> => {
     try {
       return await verifyPaystack(reference);
     } catch (error: any) {
       console.error('Error verifying Paystack transaction:', error);
       throw new Error(error?.message || 'An error occurred while verifying payment');
     }
   };
 
   return {
     createNewOrderHook,
     getUserOrderHook,
     getUserOrderByIdHook,
     createPaystackHook,
     verifyPaystackHook,
   };
 };
 