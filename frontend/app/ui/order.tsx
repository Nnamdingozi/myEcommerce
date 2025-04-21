
'use client'

import React, { useState, useEffect } from 'react';
import { useOrderContext } from '../context/orderContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '../context/cartContext';
import { usePaystackContext } from '../context/paystackContext';

const OrderForm: React.FC = () => {
  const { order, isLoading, error, successMessage, createNewOrder,  } = useOrderContext();
  const { createPaystack, verifyPayment } = usePaystackContext();
  const router = useRouter();
 
  
  const [paymentMtd, setPaymentMtd] = useState('');
  const [shippingAddy, setShippingAddy] = useState('');
  const [shippingMtd, setShippingMtd] = useState('');
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [curr, setCurr] = useState('');
  const [formattedDate, setFormattedDate] = useState<string>('');
  const { setCart } = useCart();
  

  const resetFormFields = () => {
    setPaymentMtd('');
    setShippingAddy('');
    setShippingMtd('');
    setCurr('');
  };

  useEffect(() => {
    if (order && order.order_date) {
      setFormattedDate(new Date(order.order_date).toLocaleDateString());
    }
  }, [order]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const currentOrder = await createNewOrder(paymentMtd, shippingAddy, shippingMtd, curr);
      if (!currentOrder) throw new Error('Order creation failed');

      if (currentOrder.id !== undefined) {
        if (currentOrder.payment_method === 'Cash') {
          resetFormFields();
          setShowOrderDetails(true);
        } else {
          const getUrl = await createPaystack(currentOrder.id);
          if (getUrl) {
            window.location.href = getUrl.authorization_url;
          } else {
            throw new Error('Authorization URL not found');
          }
        }
      }
    } catch (error) {

      console.error('Error creating order:', error);
    }
  };


  const handleClosure = () => {
    resetFormFields();
    setShowOrderDetails(false);
    setCart([]);
    router.push('/');
  };


  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create New Order</h2>
      <form onSubmit={handleSubmit}>
        {/* Form Fields */}
        <div className="mb-4">
          <label htmlFor="shippingAddy" className="block text-gray-700 font-medium mb-2">Shipping Address:</label>
          <input id="shippingAddy" type="text" value={shippingAddy} onChange={(e) => setShippingAddy(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md" required />
        </div>
        
        <div className="mb-4">
          <label htmlFor="shippingMtd" className="block text-gray-700 font-medium mb-2">Shipping Method:</label>
          <input id="shippingMtd" type="text" value={shippingMtd} onChange={(e) => setShippingMtd(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md" required />
        </div>

        <div className="mb-4">
          <label htmlFor="curr" className="block text-gray-700 font-medium mb-2">Currency:</label>
          <select id="curr" value={curr} onChange={(e) => setCurr(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md" required>

            <option value="" disabled>Select Preferred Currency</option>
            <option value="USD">USD</option>
            <option value="NGN">NGN</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="paymentMtd" className="block text-gray-700 font-medium mb-2">Payment Method:</label>
          <select id="paymentMtd" value={paymentMtd} onChange={(e) => setPaymentMtd(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md" required>

            <option value="" disabled>Select a payment method</option>
            <option value="Card">Card</option>
            <option value="Cash">Cash</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Create Order'}
        </button>
      </form>
      
      {error && <p className="mt-4 text-red-600">{error}</p>}
      {isLoading && !showOrderDetails && <p className="mt-4 text-gray-700">Redirecting to Paystack...</p>}

      {showOrderDetails && order && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Order Details</h3>
            {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Created on:</strong> {formattedDate || 'N/A'}</p>
            <p><strong>Payment Method:</strong> {order.payment_method}</p>
            <p><strong>Shipping Address:</strong> {order.shipping_address}</p>
            <p><strong>Currency:</strong> {order.currency} {order.total_amount}</p>
            <button onClick={handleClosure} className="mt-4 w-full bg-green-400 text-white py-2 px-4 rounded-md hover:bg-blue-600">Continue Shopping</button>
          </div>
        </div>
      )}
    </div>
  );

};

export default OrderForm;
