
'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Order } from '../lib/definition';
import { useRouter } from 'next/navigation';
import { useUser } from './userContext';
import { createOrder, fetchUserOrder, fetchOrderById } from '../lib/data/order';


interface OrderContextProps {
    order: Order | null;
    userOrder: Order[] | null;
    isLoading: boolean;
    error: string | null;
    setError: (error: string | null) => void;
    createNewOrder: (paymentMtd: string, shippingAddy: string, shippingMtd: string, curr: string) => Promise<Order| null>;
    getUserOrder: () => Promise<Order[] | null>;
    getUserOrderById: ( orderId: number) => Promise<Order | null>;
    successMessage: string | null;
    setSuccessMessage: (message: string | null) => void;

    showOrderDetails: boolean;
    setShowOrderDetails: (show: boolean) => void;
    setIsLoading: (show: boolean) => void;
    handleCloseOrderDetails: () => void;
}


const OrderContext = createContext<OrderContextProps | null>(null);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [order, setOrder] = useState<Order | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [userOrder, setUserOrder] = useState<Order[] | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [showOrderDetails, setShowOrderDetails] = useState(false);


    const { token } = useUser();
    const router = useRouter();

    const createNewOrder = useCallback(
        async (paymentMtd: string, shippingAddy: string, shippingMtd: string, curr: string): Promise<Order | null> => {
            if (!token) {
                console.warn('No token provided. Skipping create order request.');
                return null;
            }
           
            setIsLoading(true);
            setError(null);

           
            try {
                const newOrder = await createOrder(token, paymentMtd, shippingAddy, shippingMtd, curr);
                if (newOrder ) {
                    setOrder(newOrder)
                    return newOrder
                } else {
                    throw new Error('Failed to create the order');


                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred while creating the order');
                return null;
            } finally {
                setIsLoading(false);
            }
        },
        
        [token]
    );

    const getUserOrder = useCallback(
        async (): Promise<Order[] | null> => {
            if (!token) {
                console.warn('No token provided. Skipping fetch user orders request.');
                return null;
            }


            setIsLoading(true);
            setError(null);


            try {
                const userOrders = await fetchUserOrder(token);
                setUserOrder(userOrders);
                return userOrders;
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred while fetching user orders');
                return null;
            } finally {
                setIsLoading(false);
            }
        },
        [token]
    );

    const getUserOrderById = useCallback(
        async (orderId: number): Promise<Order | null> => {
            if (!token) {
                console.warn('No token provided. Skipping fetch order by ID request.');
                return null;
            }


            setIsLoading(true);
            setError(null);

            try {

                const userOrder = await fetchOrderById(token, orderId);
                return userOrder;
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred while fetching order details');
                return null;

            } finally {
                setIsLoading(false);
            }
        },

        [token]
    );

    useEffect(()=> {
        getUserOrder();
       
       }, [getUserOrder]);




    const handleCloseOrderDetails = useCallback(() => {
        setShowOrderDetails(false);

        router.push('/');
    }, [router]);

    

    return (
        <OrderContext.Provider value={{
            order,
            userOrder,
            getUserOrder,
            getUserOrderById,
            setError,
            createNewOrder,
            handleCloseOrderDetails,
            showOrderDetails,
            setShowOrderDetails,
            setSuccessMessage,
            setIsLoading,
            isLoading,
            error,
            successMessage
        }}>
            {children}
        </OrderContext.Provider>
    );
};


export const useOrderContext = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrderContext must be used within an OrderProvider');
    }
    return context;
};



// 'use client';

// import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
// import { Order, Paystack, VerifyTransactionResponse } from '../lib/definition';
// import { orderHookLogic } from '@/app/lib/hooks/orderHook';
// import { useRouter } from 'next/navigation';
// import { useUser } from './userContext';

// interface OrderContextProps {
//   order: Order | null;
//   userOrder: Order[] | null;
//   isLoading: boolean;
//   error: string | null;
//   setError: (error: string | null) => void;

//   createNewOrder: (
//     token: string,
//     paymentMtd: string,
//     shippingAddy: string,
//     shippingMtd: string,
//     curr: string
//   ) => Promise<{ orderId: number } | null | undefined>;
//   getUserOrder: (token: string) => Promise<Order[] | null | undefined>;
//   getUserOrderById: (token: string, orderId: number) => Promise<Order | null | undefined>;
//   createPaystack: (orderId: number) => Promise<Paystack | null | undefined>;
//   verifyPayment: (transactionReference: string) => Promise<VerifyTransactionResponse | null | undefined>;
//   successMessage: string | null;
//   setSuccessMessage: (message: string | null) => void;
//   showOrderDetails: boolean;
//   setShowOrderDetails: (show: boolean) => void;
//   setIsLoading: (show: boolean) => void;
//   handleCloseOrderDetails: () => void;
// }

// const OrderContext = createContext<OrderContextProps | undefined>(undefined);

// export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [order, setOrder] = useState<Order | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [userOrder, setUserOrder] = useState<Order[] | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [showOrderDetails, setShowOrderDetails] = useState(false);

//   const router = useRouter();
//   const { token } = useUser();

//   const {
//     createNewOrderHook,
//     getUserOrderHook,
//     getUserOrderByIdHook,
//     createPaystackHook,
//     verifyPaystackHook,
//   } = orderHookLogic();

//   const createNewOrder = useCallback(
//     async (
//       token: string,
//       paymentMtd: string,
//       shippingAddy: string,
//       shippingMtd: string,
//       curr: string
//     ): Promise<{ orderId: number } | null | undefined> => {
//       setIsLoading(true);
//       setError(null);

//       if (!token) {
//         console.warn('No token provided. Skipping create order request.');
//         return undefined;
//       }

//       try {
//         const newOrder = await createNewOrderHook(token, paymentMtd, shippingAddy, shippingMtd, curr);
//         if (newOrder?.orderId) {
//           const fetchedOrder = await getUserOrderByIdHook(token, newOrder.orderId);
//           if (fetchedOrder) {
//             setOrder(fetchedOrder);
//             return { orderId: newOrder.orderId };
//           }
//         } else {
//           throw new Error('Failed to retrieve order ID');
//         }
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An error occurred while creating the order');
//         return null;
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [createNewOrderHook, getUserOrderByIdHook]
//   );

//   const getUserOrder = useCallback(
//     async (token: string): Promise<Order[] | null | undefined> => {
//       if (!token) {
//         console.warn('No token provided. Skipping fetch user orders request.');
//         return undefined;
//       }

//       setIsLoading(true);
//       setError(null);

//       try {
//         const userOrders = await getUserOrderHook(token);
//         if (userOrders) {
//           setUserOrder(userOrders);
//         }
//         return userOrders;
//       } catch (error) {
//         setError(error instanceof Error ? error.message : 'An error occurred while fetching user orders');
//         return null;
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [getUserOrderHook]
//   );

//   const getUserOrderById = useCallback(
//     async (token: string, orderId: number): Promise<Order | null | undefined> => {
//       if (!token) {
//         console.warn('No token provided. Skipping fetch order by ID request.');
//         return undefined;
//       }

//       setIsLoading(true);
//       setError(null);

//       try {
//         return await getUserOrderByIdHook(token, orderId);
//       } catch (error) {
//         setError(error instanceof Error ? error.message : 'An error occurred while fetching order details');
//         return null;
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [getUserOrderByIdHook]
//   );

//   const createPaystack = useCallback(
//     async (orderId: number): Promise<Paystack | null | undefined> => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const initialPay = await createPaystackHook(orderId);
//         return initialPay;
//       } catch (error) {
//         setError(error instanceof Error ? error.message : 'An error occurred while initializing paystack');
//         return null;
//       } finally {
//         setIsLoading(false);
//         router.push('/');
//       }
//     },
//     [createPaystackHook]
//   );

//   const verifyPayment = useCallback(
//     async (reference: string): Promise<VerifyTransactionResponse | null | undefined> => {
//       setIsLoading(true);
//       setError(null);

//       try {
//         const verifyPay = await verifyPaystackHook(reference);
//         return verifyPay;
//       } catch (error) {
//         setError(error instanceof Error ? error.message : 'An error occurred while verifying payment');
//         return null;
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [verifyPaystackHook]
//   );

//   const handleCloseOrderDetails = useCallback(() => {
//     setShowOrderDetails(false);
//     router.push('/');
//   }, [router]);

//   return (
//     <OrderContext.Provider
//       value={{
//         order,
//         userOrder,
//         isLoading,
//         error,
//         createNewOrder,
//         getUserOrder,
//         getUserOrderById,
//         createPaystack,
//         verifyPayment,
//         successMessage,
//         setSuccessMessage,
//         setError,
//         showOrderDetails,
//         setShowOrderDetails,
//         setIsLoading,
//         handleCloseOrderDetails,
//       }}
//     >
//       {children}
//     </OrderContext.Provider>
//   );
// };

// export const useOrderContext = () => {
//   const context = useContext(OrderContext);
//   if (!context) {
//     throw new Error('useOrderContext must be used within an OrderProvider');
//   }
//   return context;
// };
