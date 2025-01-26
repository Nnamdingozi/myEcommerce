'use client'
import {Order } from "@/app/lib/definition"


// Define the component props
type UserOrderDisplayProps = {
  userOrder: Order[];
};

'use client';

export default function UserOrderDisplay({ userOrder }: UserOrderDisplayProps) {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Your Orders</h2>
      {userOrder.map((order) => (
        <div key={order.id} className="mb-4 p-4 border border-gray-200 rounded-md">
          <h3 className="text-lg font-semibold text-gray-700">Order ID: {order.id}</h3>

          <p className="text-gray-600 mt-2"><span className="font-medium">Order with tracking Number:</span> {order.tracking_number},
            created on {order.order_date ? new Date(order.order_date).toLocaleDateString() : 'N/A'}</p>
          <p className="text-gray-600 mt-2"><span className="font-medium">Payment method:</span> {order.payment_method}</p>
          <p className="text-gray-600 mt-2"><span className="font-medium">Shipping Address:</span> {order.shipping_address}</p>
          <p className="text-gray-600 mt-2"><span className="font-medium">Shipping Method:</span> {order.shipping_method}</p>
          <p className="text-gray-600 mt-2"><span className="font-medium">Total:</span> {order.currency} {order.total_amount}</p>
          {/* Add other order details as needed */}
        </div>
      ))}
    </div>
  );
}


