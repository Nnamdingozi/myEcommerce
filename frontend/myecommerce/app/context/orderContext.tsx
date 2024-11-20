// 'use client'

// import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
// import { Order, Paystack, VerifyTransactionResponse } from '../lib/definition';
// import { orderHookLogic } from '@/app/lib/hooks/orderHook';
// import { useRouter } from 'next/navigation';
// import { useUser } from './userContext';



// interface OrderContextProps {
//     order: Order | null;
//     userOrder: Order[] | null;
//     isLoading: boolean;
//     error: string | null;
//     setError: (error: string | null) => void;
//     createNewOrder: (token: string, paymentMtd: string, shippingAddy: string, shippingMtd: string, curr: string) => Promise<{ orderId: number } | null | undefined>;
//     getUserOrder: (token: string) => Promise<Order[] | null | undefined>;
//     getUserOrderById: (token: string, orderId: number) => Promise<Order | null | undefined>;
//     createPaystack: (orderId: number) => Promise<Paystack | null | undefined>;
//     successMessage: string | null;
//     setSuccessMessage: (message: string | null) => void
//     showOrderDetails: boolean;
//     setShowOrderDetails: (show: boolean) => void;
//     setIsLoading: (show: boolean) => void;
//     handleCloseOrderDetails: () => void;
//     verifyPayment: (transactionReference: string) => Promise<VerifyTransactionResponse | null | undefined>
// }


// const OrderContext = createContext<OrderContextProps | undefined>(undefined);

// export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const [order, setOrder] = useState<Order | null>(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [userOrder, setUserOrder] = useState<Order[] | null>(null);
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);
//     const [showOrderDetails, setShowOrderDetails] = useState(false);
//     const { token } = useUser();
//     const router = useRouter()
//     const { createNewOrderHook, getUserOrderHook, getUserOrderByIdHook, createPaystackHook, verifyPaystackHook } = orderHookLogic(
//         setOrder,
//         setUserOrder,
//         setIsLoading,
//         setError,
//         setSuccessMessage,
//         setShowOrderDetails
//     )


//     // const createNewOrder = useCallback(
//     //     async (token: string, paymentMtd: string, shippingAddy: string, shippingMtd: string, curr: string): Promise<{ orderId: number } | null | undefined> => {
//     //         setIsLoading(true);
//     //         setError(null);

//     //         if (!token) {
//     //             console.warn('No token provided. Skipping add to cart request.');
//     //             return undefined;
//     //           }
            

//     //         try {
//     //             const newOrder = await createNewOrderHook(token, paymentMtd, shippingAddy, shippingMtd, curr);
//     //             if (newOrder && newOrder.orderId) {
//     //                 return { orderId: newOrder.orderId }; // Ensure we return an object with orderId
//     //             } else {
//     //                 throw new Error('Failed to retrieve order ID');
//     //             }
//     //         } catch (err) {
//     //             setError(err instanceof Error ? err.message : 'An error occurred while creating the order');
//     //             return null;
//     //         } finally {
//     //             setIsLoading(false);
//     //         }
//     //     },
//     //     [createNewOrderHook]
//     // );
//     const createNewOrder = useCallback(
//         async (token: string, paymentMtd: string, shippingAddy: string, shippingMtd: string, curr: string): Promise<{ orderId: number } | null | undefined> => {
//             setIsLoading(true);
//             setError(null);
    
//             if (!token) {
//                 console.warn('No token provided. Skipping create order request.');
//                 return undefined;
//             }
    
//             try {
//                 const newOrder = await createNewOrderHook(token, paymentMtd, shippingAddy, shippingMtd, curr);
//                 if (newOrder && newOrder.orderId) {
//                     return { orderId: newOrder.orderId };
//                 } else {
//                     throw new Error('Failed to retrieve order ID');
//                 }
//             } catch (err) {
//                 setError(err instanceof Error ? err.message : 'An error occurred while creating the order');
//                 return null;
//             } finally {
//                 setIsLoading(false);
//             }
//         },
//         [createNewOrderHook]
//     );
    

//     const getUserOrder = useCallback(
//         async (token: string): Promise<Order[] | null | undefined> => {

//             if (!token) {
//                 console.warn('No token provided. Skipping add to cart request.');
//                 return undefined;
//               }
            

//             setIsLoading(true);
//             setError(null);



//             try {
//                 const userOrders = await getUserOrderHook(token); // Wait for getUserOrderHook to complete
//                 return userOrders;
//             } catch (error) {
//                 setError(error instanceof Error ? error.message : 'An error occurred while fetching user orders');
//                 return null; // Return null in case of an error to match the return type
//             } finally {
//                 setIsLoading(false); // Reset loading state
//             }
//         },
//         [getUserOrderHook]
//     );

//     const getUserOrderById = useCallback(
//         async (token: string, orderId: number): Promise<Order | null | undefined> => {

//             if (!token) {
//                 console.warn('No token provided. Skipping add to cart request.');
//                 return undefined;
//               }

              
//             setIsLoading(true);
//             setError(null);

//             try {
//                 const userOrder = await getUserOrderByIdHook(token, orderId); // Wait for getUserOrderHook to complete
//                 return userOrder;
//             } catch (error) {
//                 setError(error instanceof Error ? error.message : 'An error occurred while initializing paystack in order context');
//                 return null
//             } finally {
//                 setIsLoading(false);
//             }
//         },
//         [getUserOrderByIdHook]
//     );

//     const createPaystack = useCallback(
//         async (orderId: number): Promise<Paystack | null | undefined> => {
              
//             setIsLoading(true);
//             setError(null);
//             try {
//                 console.log('order id in createPaystack context:', orderId)
//                 const initialPay = await createPaystackHook(orderId);
//                 console.log('initialPay value in context:', initialPay)
//                 return initialPay


//             } catch (error) {

//                 setError(error instanceof Error ? error.message : 'An error occurred while fetching the order by ID');
//                 return null; // Return null in case of an error to match the return type
//             } finally {
//                 setIsLoading(false); // Reset loading state
//                 router.push('/')
//             }

//         }, [createPaystackHook]);


//     const verifyPayment = useCallback(
//         async (reference: string): Promise<VerifyTransactionResponse | null | undefined> => {
       
//               setIsLoading(true);
//               setError(null);
  
            
//             try {
//                 console.log('transaction reference in order context:', reference)
//                 const verifyPay = await verifyPaystackHook(reference);
//                 console.log('verifyPay response value in context:', verifyPay);
//                 return verifyPay


//             } catch (error) {

//                 setError(error instanceof Error ? error.message : 'An error occurred while fetching the order by ID');
//                 return null; // Return null in case of an error to match the return type
//             } finally {
//                 setIsLoading(false); // Reset loading state
//                 router.push('/')
//             }

//         }, [verifyPaystackHook]);

        


//     const handleCloseOrderDetails = useCallback(() => {
//         setShowOrderDetails(false);
//         router.push('/')
//     }, []);



//     return (
//         <OrderContext.Provider value={{
//             order,
//             isLoading,
//             error,
//             successMessage,
//             createNewOrder,
//             userOrder,
//             getUserOrder,
//             getUserOrderById,
//             setError,
//             createPaystack,
//             handleCloseOrderDetails,
//             showOrderDetails, setShowOrderDetails,
//             setSuccessMessage,
//             setIsLoading, 
//             verifyPayment
//         }}>
//             {children}

//         </OrderContext.Provider>
//     );
// }


// export const useOrderContext = () => {
//     const context = useContext(OrderContext);
//     if (!context) {
//         throw new Error('useOrderContext must be used within an OrderProvider');
//     }
//     return context;
// };


'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
 import { Order, Paystack, VerifyTransactionResponse } from '../lib/definition';
 import { orderHookLogic } from '@/app/lib/hooks/orderHook';
 import { useRouter } from 'next/navigation';
 import { useUser } from './userContext';

interface OrderContextProps {
    order: Order | null;
    userOrder: Order[] | null;
    isLoading: boolean;
    error: string | null;
    setError: (error: string | null) => void;
    createNewOrder: (paymentMtd: string, shippingAddy: string, shippingMtd: string, curr: string) => Promise<{ orderId: number } | null | undefined>;
    getUserOrder: () => Promise<Order[] | null | undefined>;
    getUserOrderById: (orderId: number) => Promise<Order | null | undefined>;
    createPaystack: (orderId: number) => Promise<Paystack | null | undefined>;
    successMessage: string | null;
    setSuccessMessage: (message: string | null) => void;
    showOrderDetails: boolean;
    setShowOrderDetails: (show: boolean) => void;
    setIsLoading: (show: boolean) => void;
    handleCloseOrderDetails: () => void;
    verifyPayment: (transactionReference: string) => Promise<VerifyTransactionResponse | null | undefined>;
}

const OrderContext = createContext<OrderContextProps | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [order, setOrder] = useState<Order | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [userOrder, setUserOrder] = useState<Order[] | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [showOrderDetails, setShowOrderDetails] = useState(false);
    const { token } = useUser(); // Token should be fetched once and used in context
    const router = useRouter();

    const { createNewOrderHook, getUserOrderHook, getUserOrderByIdHook, createPaystackHook, verifyPaystackHook } = orderHookLogic(
        setOrder,
        setUserOrder,
        setIsLoading,
        setError,
        setSuccessMessage,
        setShowOrderDetails
    );

    // Memoize createNewOrder to prevent unnecessary token fetch
    const createNewOrder = useCallback(
        async (paymentMtd: string, shippingAddy: string, shippingMtd: string, curr: string): Promise<{ orderId: number } | null | undefined> => {
            if (!token) {
                console.warn('No token provided. Skipping create order request.');
                return undefined;
            }

            setIsLoading(true);
            setError(null);

            try {
                const newOrder = await createNewOrderHook(token, paymentMtd, shippingAddy, shippingMtd, curr); 
                if (newOrder && newOrder.orderId) {
                    return { orderId: newOrder.orderId };
                } else {
                    throw new Error('Failed to retrieve order ID');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred while creating the order');
                return null;
            } finally {
                setIsLoading(false);
            }
        },
        [createNewOrderHook, token]
    );

    const getUserOrder = useCallback(
        async (): Promise<Order[] | null | undefined> => {
            if (!token) {
                console.warn('No token provided. Skipping get user order request.');
                return undefined;
            }

            setIsLoading(true);
            setError(null);

            try {
                const userOrders = await getUserOrderHook(token); // Use token directly here
                return userOrders;
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An error occurred while fetching user orders');
                return null;
            } finally {
                setIsLoading(false);
            }
        },
        [getUserOrderHook, token]
    );

    const getUserOrderById = useCallback(
        async (orderId: number): Promise<Order | null | undefined> => {
            if (!token) {
                console.warn('No token provided. Skipping get user order by ID request.');
                return undefined;
            }

            setIsLoading(true);
            setError(null);

            try {
                const userOrder = await getUserOrderByIdHook(token, orderId); // Use token directly here
                return userOrder;
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An error occurred while fetching the order details');
                return null;
            } finally {
                setIsLoading(false);
            }
        },
        [getUserOrderByIdHook, token]
    );

    const createPaystack = useCallback(
        async (orderId: number): Promise<Paystack | null | undefined> => {
            if (!orderId) return null;

            setIsLoading(true);
            setError(null);

            try {
                const initialPay = await createPaystackHook(orderId);
                return initialPay;
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An error occurred while fetching the Paystack details');
                return null;
            } finally {
                setIsLoading(false);
                router.push('/');
            }
        },
        [createPaystackHook, router]
    );

    const verifyPayment = useCallback(
        async (reference: string): Promise<VerifyTransactionResponse | null | undefined> => {
            if (!reference) return null;

            setIsLoading(true);
            setError(null);

            try {
                const verifyPay = await verifyPaystackHook(reference);
                return verifyPay;
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An error occurred while verifying payment');
                return null;
            } finally {
                setIsLoading(false);
            }
        },
        [verifyPaystackHook, router]
    );

    const handleCloseOrderDetails = useCallback(() => {
        setShowOrderDetails(false);
        router.push('/');
    }, [router]);

    return (
        <OrderContext.Provider value={{
            order,
            isLoading,
            error,
            successMessage,
            createNewOrder,
            userOrder,
            getUserOrder,
            getUserOrderById,
            setError,
            createPaystack,
            handleCloseOrderDetails,
            showOrderDetails, setShowOrderDetails,
            setSuccessMessage,
            setIsLoading,
            verifyPayment
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
