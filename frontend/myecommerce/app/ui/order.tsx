'use client';

import React, { useState } from 'react';
import { useOrderContext } from '../context/orderContext';
import { useRouter } from 'next/navigation';
import { Order } from '../lib/definition';
import { format } from 'path';

const OrderForm: React.FC = () => {

  const { createNewOrder, isLoading, error, order, getUserOrderById} = useOrderContext();
  const router = useRouter();


  // Local state for form fields
  const [paymentMtd, setPaymentMtd] = useState('');
  const [shippingAddy, setShippingAddy] = useState('');
  const [shippingMtd, setShippingMtd] = useState('');
  const [curr, setCurr] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [singleOrder, setSingleOrder] = useState(false);
  const [singleOrderDetails, setSingleOrderDetails] = useState<Order | null>(null)
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Call the createNewOrder function from the context
      const orderId = await createNewOrder(paymentMtd, shippingAddy, shippingMtd, curr);
      
      if(orderId){
       const orderDetails =  await getUserOrderById(orderId);
        setSingleOrderDetails(orderDetails)
      }
      
      setSuccessMessage('Order successfully created!');
      setPaymentMtd('');
      setShippingAddy('');
      setShippingMtd('');
      setCurr('');
      setSingleOrder(true);



    } catch (error) {
      console.error('Error creating order:', error)
      setSuccessMessage('');
    }

  };

  const handleSingleOrder = () => {
    setSingleOrder(false)
    router.push('/')
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800"> Create New Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="paymentMtd" className="block text-gray-700 font-medium mb-2">Payment Method:</label>
          <input
            id="paymentMtd"
            type="text"
            value={paymentMtd}
            onChange={(e) => setPaymentMtd(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          />
        </div>

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
          <input
            id="curr"
            type="text"
            value={curr}
            onChange={(e) => setCurr(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          disabled={isLoading}>

          {isLoading ? 'Processing...' : 'Create Order'}
        </button>
      </form>
      {error && <p className="mt-4 text-red-600">Error: {error}</p>}

      {singleOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
            <h3 className="text-xl font-semibold mb-4">Order Details</h3>
            {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
            <p><strong>Order ID:</strong> {order?.id}</p>
            <p><strong>Created on :</strong> {order?.order_date ? new Date(order.order_date).toLocaleDateString() : 'N/A'}</p>
            <p><strong>Payment Method:</strong> {order?.payment_method}</p>
            <p><strong>Shipping Address:</strong> {order?.shipping_address}</p>
            <p><strong>Shipping Method:</strong> {order?.shipping_method}</p>
            <p><strong>Currency:</strong> {order?.currency}{order?.total_amount} </p>

            <button
              onClick={handleSingleOrder}
              className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>


  );
};

export default OrderForm;
