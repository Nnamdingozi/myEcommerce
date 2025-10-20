// src/services/orderService.ts

import { PrismaClient, Order } from '@prisma/client';
import { Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// Define a type for the input data needed to create an order

type OrderInputData = Pick<
  Prisma.OrderCreateInput,
  'paymentMethod' | 'shippingAddress' | 'shippingMethod' | 'currency'
>;

export const createOrder = async (orderData: OrderInputData, userId: number): Promise<Order> => {
  // Use a transaction to ensure all operations succeed or none do.
  const newOrder = await prisma.$transaction(async (tx) => {
    // 1. Fetch the user's cart items AND lock the rows for the transaction
    // This prevents race conditions where the cart might change during checkout.
    const cartItems = await tx.cart.findMany({
      where: { userId },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      throw new Error('Cannot create an order with an empty cart.');
    }

    // 2. Calculate the total amount
    const totalAmount = cartItems.reduce((acc, item) => {
      // Ensure product price is a number for calculation
      const price = new Prisma.Decimal(item.product.price);
      return acc.add(price.mul(item.quantity));
    }, new Prisma.Decimal(0));

    // Generate a random tracking number
    const trackingNumber = Math.random().toString(36).substring(2, 10).toUpperCase();

    // 3. Create the Order record
    const order = await tx.order.create({
      data: {
        userId,
        totalAmount,
        trackingNumber,
        status: 'PENDING',
        paymentStatus: 'UNPAID',
        ...orderData, 

        // 4. Create the associated OrderItems in a nested write
        items: {
          create: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price, 
          })),
        },
      },
      include: {
        items: true, // Include the newly created items in the return value
      },
    });

    // 5. Clear the user's cart
    await tx.cart.deleteMany({
      where: { userId },
    });

   
    return order;
  });

  return newOrder;
};

// Get all orders for a specific user
export const getAllOrdersForUser = async (userId: number): Promise<Order[]> => {
  const orders = await prisma.order.findMany({
    where: { userId },
    include: {
      items: { // Include the items for each order
        include: {
          product: true // And the product details for each item
        }
      },
    },
    orderBy: { createdAt: 'desc' },
  });
  return orders;
};

// Get a single order by its ID, ensuring it belongs to the correct user
export const getOrderByIdForUser = async (orderId: number, userId: number): Promise<Order | null> => {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
      userId: userId, // Security check: user can only access their own orders
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
      customer: true, // Optionally include customer details
    },
  });
  return order;
};