
import { createOrder, fetchUserOrder, fetchOrderById, initializePaystack } from "../data";
import { Order, Paystack } from '@/app/lib/definition'

interface NewOrder {
   id: number;
   payment_method: string
}



export const orderHookLogic = (
   setOrder: React.Dispatch<React.SetStateAction<Order | null>>,
   setUserOrder: React.Dispatch<React.SetStateAction<Order[] | null>>,
   setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
   setError: React.Dispatch<React.SetStateAction<string | null>>,
   setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>,
   setShowOrderDetails: React.Dispatch<React.SetStateAction<boolean>>
   ) => {

   const createNewOrderHook = async(
      paymentMtd: string,
       shippingAddy: string,
       shippingMtd: string,
        curr: string
        ): Promise<{orderId: number} | null> => {
         setIsLoading(true);
      setError(null);

try {
   const newOrder = await createOrder(paymentMtd, shippingAddy, shippingMtd, curr)
   if (newOrder && newOrder.orderId) {
      setShowOrderDetails(true);
      const orderValues: Order | null = await getUserOrderByIdHook(newOrder.orderId);
      console.log('Fetched order values in orderHook:', orderValues);
      if(orderValues && orderValues.id  !== undefined) {
         setSuccessMessage(orderValues.payment_method === 'Cash' ? 'Order successfully created!' : '');
         setOrder(orderValues);
         console.log('new order in orderContext, ', orderValues)
         return { orderId: orderValues.id };
      }

      
   } else {
      setError('order creation failed');
      return null;
   }


} catch (error: any) {
   console.error('Error creating order:', error);
   setError(error?.message || 'Failed to create order');
   return null
} finally {
   setIsLoading(false);
}
return null
 };

const getUserOrderHook = async() => {
   setIsLoading(true);
   setError(null);
 
        try {
            const userOrders = await fetchUserOrder();
            setUserOrder(userOrders);
            return userOrders;
        } catch (error: any) {
            setError(error)

        } finally {
            setIsLoading(false);
        }

        return null

};


const getUserOrderByIdHook = async(orderId: number) => {
setIsLoading(true);
setError(null);

try {
   const userOrderById = await fetchOrderById(orderId);
   setOrder(userOrderById);
   return userOrderById;
} catch (error: any) {
   setError(error)

} finally {
   setIsLoading(false);
}

return null



};


const createPaystackHook = async (orderId: number) => {
   console.log('orderID in orderContext;', orderId)
   setIsLoading(true);
   setError(null)
   try {
      const initializePay: Paystack | null = await initializePaystack(orderId);
      console.log('id passed to initialize pay in createPaystackHoo:', orderId)
      console.log('data after initialze pay in order hook:', initializePay)
      return initializePay;
   } catch (error: any) {
      console.error('Error initializing Paystack:', error);
      setError(error.message || 'An error occurred while initializing payment.');

   } finally {
      setIsLoading(false);
   }

   return null
};
return { createNewOrderHook, getUserOrderHook, getUserOrderByIdHook, createPaystackHook};
   }