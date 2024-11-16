'use client'

import React, { useEffect, useState } from 'react';
import { useOrderContext } from '../context/orderContext';
import { useRouter } from 'next/navigation';
// import { Order } from '../lib/definition';
import { useUser } from '../context/userContext';
import { useCart } from '../context/cartContext';

const OrderForm: React.FC = () => {
  const { order, isLoading, error, successMessage, createNewOrder, userOrder, getUserOrderById, setError, createPaystack,  handleCloseOrderDetails, showOrderDetails, setShowOrderDetails, setSuccessMessage,setIsLoading } = useOrderContext();
  const router = useRouter();

  const [paymentMtd, setPaymentMtd] = useState('');
  const [shippingAddy, setShippingAddy] = useState('');
  const [shippingMtd, setShippingMtd] = useState('');
  const [curr, setCurr] = useState('');
  const { token } = useUser();
  const {setCart} = useCart();



  const resetFormFields = () => {
    setPaymentMtd('');
    setShippingAddy('');
    setShippingMtd('');
    setCurr('');
  };

  const isOrderValid = order !== null && order !== undefined;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage('');
    setIsLoading(true)

    try {
      const result = await createNewOrder(token!, paymentMtd, shippingAddy, shippingMtd, curr);
     console.log('value of result in handlesubmit:', result)
      if (!result) throw new Error('Order creation failed');

      const { orderId } = result;
     console.log(' orderId in handle submit:', orderId)
       const currentOrder = await getUserOrderById(token!, orderId);
       console.log('currentOrder value in handle submit:', currentOrder)
     

      if (currentOrder && currentOrder.id !== undefined) {
        console.log('currentOrder.payment method:', currentOrder.payment_method)
        console.log('currentOrder id:', currentOrder.id)
        // setCart([]);
        if (currentOrder.payment_method === 'Cash') {
          resetFormFields();
         
        } else {
          console.log('redirecting to paystack');
       const getUrl = await  createPaystack(token!, currentOrder.id);
       console. log('data from initialize paystack in handleSubmit:', getUrl)
        if(getUrl) {
          const {authorization_url} = getUrl;
          window.location.href = authorization_url
        } else {
          throw new Error('authorization url not found')
        }
        }
      
       
      }
    }
    catch (error) {
      console.error('Error creating order:', error);
      setSuccessMessage('');
    } finally {
      setIsLoading(false)
    }
  };

  const handleClosure = () => {
    handleCloseOrderDetails()
    setShowOrderDetails(false);
    setCart([])
    router.push('/');
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create New Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="shippingAddy" className="block text-gray-700 font-medium mb-2">Shipping Address:</label>
          <input
            id="shippingAddy"
            type="text"
            value={shippingAddy}
            onChange={(e) => setShippingAddy(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="shippingMtd" className="block text-gray-700 font-medium mb-2">Shipping Method:</label>
          <input
            id="shippingMtd"
            type="text"
            value={shippingMtd}
            onChange={(e) => setShippingMtd(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="curr" className="block text-gray-700 font-medium mb-2">Currency:</label>
          <select
            id="curr"
            value={curr}
            onChange={(e) => setCurr(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          >
            <option value="" disabled>Select Preferred Currency</option>
            <option value="USD">USD</option>
            <option value="NGN">NGN</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="paymentMtd" className="block text-gray-700 font-medium mb-2">Payment Method:</label>
          <select
            id="paymentMtd"
            value={paymentMtd}
            onChange={(e) => setPaymentMtd(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          >
            <option value="" disabled>Select a payment method</option>
            <option value="Card">Card</option>
            <option value="Cash">Cash</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Create Order'}
        </button>
      </form>
      {error && <p className="mt-4 text-red-600">Error: {error}</p>}

      {/* display when order is successfull */}

      {showOrderDetails  && isOrderValid && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
            <h3 className="text-xl font-semibold mb-4">Order Details</h3>
            {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
            <p><strong>Order ID:</strong> {order!.id}</p>
            <p><strong>Created on:</strong> {order!.order_date ? new Date(order!.order_date).toLocaleDateString() : 'N/A'}</p>
            <p><strong>Payment Method:</strong> {order!.payment_method}</p>
            <p><strong>Shipping Address:</strong> {order!.shipping_address}</p>
            <p><strong>Shipping Method:</strong> {order!.shipping_method}</p>
            <p><strong>Currency:</strong> {order!.currency}{order!.total_amount}</p>

            <button
              onClick={handleClosure}
              className="mt-4 w-full bg-green-400 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {order!.payment_method === 'Cash'? 'continue shopping' : 'Redirecting to paystack'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderForm;

