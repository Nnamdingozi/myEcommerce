'use client'
import { useEffect } from "react"
import { useOrderContext } from "../context/orderContext"

export default function UserOrderDisplay () {
const {getUserOrder, userOrder,isLoading, error } = useOrderContext()

useEffect(()=> {
 getUserOrder();
    console.log('user order fron getUserOrder useEffect:', userOrder)
}, [getUserOrder]);


if(isLoading) {
return <p>Loading ...</p>
};

if(error) {
    return <p>Error: {error}</p>
};

if(!userOrder) {
    return <p> No Orders found</p>
};

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Your Orders</h2>
      {userOrder.map((order) => (
        <div key={order.id} className="mb-4 p-4 border border-gray-200 rounded-md">
          <h3 className="text-lg font-semibold text-gray-700">Order ID: {order.id}</h3>

        <p className="text-gray-600 mt-2"><span className="font-medium"> Order with tracking Number:</span> {order.tracking_number},
         created on {order.order_date ? new Date(order.order_date).toLocaleDateString() : 'N/A'}</p>
          <p className="text-gray-600 mt-2"><span className="font-medium">Payment method:</span> {order.payment_method}</p>
          <p className="text-gray-600 mt-2"><span className="font-medium">Shipping Address:</span> {order.shipping_address}</p>
          <p className="text-gray-600 mt-2"><span className="font-medium">Shipping Method:</span> {order.shipping_method}</p>
          <p className="text-gray-600 mt-2"><span className="font-medium">total:</span> {order.currency} {order.total_amount}</p>
          {/* Add other order details as needed */}
        </div>
      ))}
    </div>
  );
};


