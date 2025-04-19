// const { createOrder, getAllOrder, getOrderById } = require('../services/orderService');

// const createOrderHandler = async (req, res) => {
//     try {
//         const userId = req.user?.id;

//         if (!userId) {
//             return res.status(400).json({ message: 'User ID is required' });
//         }

//         const { paymentMtd, shippingAddy, shippingMtd, curr } = req.body;

//         if (!paymentMtd || !shippingAddy || !shippingMtd || !curr) {
//             return res.status(400).json({ message: 'All order fields are required' });
//         }

//         // Call the service to create the order and return the full order object
//         const newOrder = await createOrder(userId, paymentMtd, shippingAddy, shippingMtd, curr);

//         if (newOrder) {
//             return res.status(201).json(newOrder);  // Return the full order object
//         } else {
//             return res.status(400).json({ message: 'Error while creating order' });
//         }
//     } catch (err) {
//         console.error('Error creating order:', err);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };



// const getAllOrderHandler = async (req, res) => {
//     try {
//         const userId = req.user?.id;

//         if (!userId) {
//             return res.status(400).json({ message: 'User ID is required' });
//         }

//         const orders = await getAllOrder(userId);

//         if (!orders || orders.length === 0) {
//             return res.status(404).json({ message: 'No orders found' });
//         }

//         res.status(200).json(orders);
//     } catch (err) {
//         console.error('Error fetching orders:', err);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// const getOrderByIdHandler = async (req, res) => {
//     try {
//         const userId = req.user?.id;
//         const { orderId } = req.params;

//         if (!userId) {
//             return res.status(400).json({ message: 'User ID is required' });
//         }

//         if (!orderId || isNaN(orderId)) {
//             return res.status(400).json({ message: 'Valid order ID is required' });
//         }

//         const order = await getOrderById(orderId, userId);

//         if (!order) {
//             return res.status(404).json({ message: 'Order not found' });
//         }

//         res.status(200).json(order);
//     } catch (err) {
//         console.error('Error fetching order by ID:', err);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// module.exports = {
//     createOrderHandler,
//     getAllOrderHandler,
//     getOrderByIdHandler
// };













import { RequestHandler } from 'express';
import { createOrder, getAllOrder, getOrderById } from '../services/orderService';
import { OrderInput } from 'interface/OrderAttributes';


// Create Order Handler
export const createOrderHandler: RequestHandler = async (req, res)=> {
  try {
    const userId = Number(req.user?.id);

    if (!userId) {
    res.status(400).json({ message: 'User ID is required' });
    return;
    }

    const { paymentMtd, shippingAddy, shippingMtd, curr} = req.body;

    if (!paymentMtd || !shippingAddy || !shippingMtd || !curr) {
     res.status(400).json({ message: 'All required order fields must be provided' });
     return;
    }

    const orderData: OrderInput = {
      payment_method: paymentMtd,
      shipping_address: shippingAddy,
      shipping_method: shippingMtd,
      currency: curr,
    };
   

    const newOrder = await createOrder(orderData, userId);

    if (newOrder) {
    res.status(201).json(newOrder);
    } else {
     res.status(400).json({ message: 'Error while creating order' });
    }

  } catch (error: any) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Get All Orders Handler
export const getAllOrderHandler: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.user?.id);
    if (!userId) {
      res.status(400).json({ message: 'User ID is required' });
      return;
    }

    const orders = await getAllOrder(userId);
    if (!orders || orders.length === 0) {
      res.status(404).json({ message: 'No orders found' });
      return; 
    }

    res.status(200).json(orders);
  } catch (err: any) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get Order By ID Handler
export const getOrderByIdHandler: RequestHandler = async (req, res) => {
  try {
    const userId = Number(req.user?.id);
    const { orderId } = req.params;

    if (!userId) {
    res.status(400).json({ message: 'User ID is required' });
    return;
    }

    // Convert orderId to a number for the service call
    if (!orderId || isNaN(Number(orderId))) {
    res.status(400).json({ message: 'Valid order ID is required' });
    return;
    }

    const order = await getOrderById(Number(orderId), userId);
    if (!order) {
    res.status(404).json({ message: 'Order not found' });
    return;
    }

  res.status(200).json(order);
  } catch (err: any) {
    console.error('Error fetching order by ID:', err);
  res.status(500).json({ message: 'Internal server error' });
  }
};


// import { Request, Response, RequestHandler } from 'express';
// import { createOrder, getAllOrder, getOrderById } from '../services/orderService';
// // import User from '../database/models/user';

// // Extend Request to include the authenticated user's info.
// export interface AuthenticatedRequest extends Request {
//   user?: Express.User;
// }

// // Create Order Handler
// export const createOrderHandler: RequestHandler = async (
//   req: AuthenticatedRequest,
//   res: Response
// ): Promise<void> => {
//   try {
//     const currentUserId = req.user?.id;
//     if (!currentUserId) {
//       res.status(400).json({ message: 'User ID is required' });
//       return;
//     }

//     const { paymentMtd, shippingAddy, shippingMtd, curr } = req.body;
//     if (!paymentMtd || !shippingAddy || !shippingMtd || !curr) {
//       res.status(400).json({ message: 'All order fields are required' });
//       return;
//     }

//     const newOrder = await createOrder(currentUserId, paymentMtd, shippingAddy, shippingMtd, curr);

//     if (newOrder) {
//       res.status(201).json(newOrder);
//     } else {
//       res.status(400).json({ message: 'Error while creating order' });
//     }
//   } catch (err: any) {
//     console.error('Error creating order:', err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// // Get All Orders Handler
// export const getAllOrdersHandler: RequestHandler = async (
//   req: AuthenticatedRequest,
//   res: Response
// ): Promise<void> => {
//   try {
//     const currentUserId = req.user?.id;
//     if (!currentUserId) {
//       res.status(400).json({ message: 'User ID is required' });
//       return;
//     }

//     const orders = await getAllOrder(currentUserId);
//     if (!orders || orders.length === 0) {
//       res.status(404).json({ message: 'No orders found' });
//       return;
//     }

//     res.status(200).json(orders);
//   } catch (err: any) {
//     console.error('Error fetching orders:', err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// // Get Order By ID Handler
// export const getOrderByIdHandler: RequestHandler = async (
//   req: AuthenticatedRequest,
//   res: Response
// ): Promise<void> => {
//   try {
//     const currentUserId = req.user?.id;
//     const { orderId } = req.params;

//     if (!currentUserId) {
//       res.status(400).json({ message: 'User ID is required' });
//       return;
//     }

//     if (!orderId || isNaN(Number(orderId))) {
//       res.status(400).json({ message: 'Valid order ID is required' });
//       return;
//     }

//     const order = await getOrderById(Number(orderId), currentUserId);
//     if (!order) {
//       res.status(404).json({ message: 'Order not found' });
//       return;
//     }

//     res.status(200).json(order);
//   } catch (err: any) {
//     console.error('Error fetching order by ID:', err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };



// import { Request, Response } from 'express';
// import { Order } from '../models/Order'; // Assuming Sequelize model
// import { IOrder } from '../types/interfaces';

// export const createOrder = async (req: Request, res: Response) => {
//   try {
//     const { userId, paymentMtd, shippingAddy, shippingMtd, curr, totalAmt } = req.body as IOrder;

//     if (!userId || !totalAmt) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     const newOrder = await Order.create({ userId, paymentMtd, shippingAddy, shippingMtd, curr, totalAmt });

//     return res.status(201).json({ orderId: newOrder.id });
//   } catch (error) {
//     console.error('Order creation failed:', error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// export const getOrdersByUser = async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params;

//     if (!userId) {
//       return res.status(400).json({ message: 'User ID is required' });
//     }

//     const orders = await Order.findAll({ where: { userId } });

//     return res.json(orders);
//   } catch (error) {
//     console.error('Fetching orders failed:', error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// export const getOrderDetails = async (req: Request, res: Response) => {
//   try {
//     const { orderId } = req.params;

//     if (!orderId) {
//       return res.status(400).json({ message: 'Order ID is required' });
//     }

//     const order = await Order.findByPk(orderId);

//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     return res.json(order);
//   } catch (error) {
//     console.error('Fetching order details failed:', error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// };
