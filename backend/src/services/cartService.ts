

// src/services/cartService.ts

import prisma from '../lib/prisma'; // Import our single, shared Prisma client instance
import { Cart, Product } from '@prisma/client'; 
import logger from '../lib/logger';

// Define a type for what a cart item looks like when it includes the product details.

export type CartItemWithProduct = Cart & {
  product: Product;
};

/**
 * Adds a new product to a user's cart or updates the quantity if it already exists.
 * This function replaces your old `addItemsToCart` and `updateCartItems` for adding items.
 * It also contains the business logic from your old Sequelize `beforeCreate/beforeUpdate` hooks.
 * @param userId The ID of the user.
 * @param productId The ID of the product to add.
 * @param quantity The quantity to add (e.g., 1).
 */
export const upsertItemInCart = async (
  userId: number,
  productId: number,
  quantity: number = 1 // Default to adding 1 item
): Promise<CartItemWithProduct> => {
  if (quantity < 1) {
    throw new Error("Quantity must be at least 1.");
  }

  // 1. Find the product to get its price. This is crucial for calculating the total.
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    throw new Error(`Product with ID ${productId} not found.`);
  }

  // 2. Check if this product is already in the user's cart.
  const existingCartItem = await prisma.cart.findFirst({
    where: { userId, productId },
  });

  if (existingCartItem) {
    // --- UPDATE existing item ---
    const newQuantity = existingCartItem.quantity + quantity;
    // Prisma's Decimal type is an object; use `.toNumber()` for calculations.
    const newTotal = product.price.toNumber() * newQuantity;

    logger.debug(`Updating cart item ${existingCartItem.id}. New quantity: ${newQuantity}`);

    return prisma.cart.update({
      where: { id: existingCartItem.id },
      data: {
        quantity: newQuantity,
        total: newTotal,
      },
      include: {
        product: true, // Include the product details in the returned object
      },
    });
  } else {
    // --- CREATE new item ---
    const total = product.price.toNumber() * quantity;

    logger.debug(`Creating new cart item for user ${userId} with product ${productId}`);

    return prisma.cart.create({
      data: {
        quantity,
        total,
        // Use Prisma's `connect` syntax to link to existing records.
        user: { connect: { id: userId } },
        product: { connect: { id: productId } },
      },
      include: {
        product: true, // Include the product details in the returned object
      },
    });
  }
};

/**
 * Fetches all cart items for a specific user, including product details.
 * Replaces your old `getItemByUserId`.
 * @param userId The ID of the user.
 */
export const getUserCart = async (userId: number): Promise<CartItemWithProduct[]> => {
  logger.debug(`Fetching cart for user ${userId}`);
  const userCart = await prisma.cart.findMany({
    where: { userId: userId },
    include: {
      product: true,
    },
    orderBy: {
      createdAt: 'asc',
    }
  });

  return userCart;
};


/**
 * Fetches a single cart item by its ID, but only if it belongs to the specified user.
 * This is a secure way to get a specific item's details.
 * @param userId The ID of the authenticated user.
 * @param cartItemId The ID of the cart item to fetch.
 */
export const getCartItemByIdForUser = async (
  userId: number,
  cartItemId: number
): Promise<CartItemWithProduct | null> => {
  logger.debug(`User ${userId} attempting to fetch cart item ${cartItemId}`);

  const cartItem = await prisma.cart.findFirst({
    // ✅ The `where` clause is the key to security.
    // It will only find a result if BOTH conditions are true.
    where: {
      id: cartItemId,
      userId: userId, // Ensures the item belongs to the current user
    },
    include: {
      product: true, // Include the product details
    },
  });

  // `findFirst` returns the item or `null` if not found.
  return cartItem;
};



export const updateCartItemQuantity = async (
  cartItemId: number,
  newQuantity: number,
  userId: number
): Promise<CartItemWithProduct | null> => { // Can return null if deleted
  logger.debug(`[SERVICE - updateQuantity]: User ${userId} updating item ${cartItemId} to quantity ${newQuantity}`);

  // If the user sets the quantity to 0 or less, remove the item from the cart.
  if (newQuantity < 1) {
    await deleteItemFromCart(cartItemId, userId); // Assumes you have a delete function
    return null; // Signal that the item was deleted
  }

  // First, verify the cart item exists and belongs to the user for security.

  const cartItem = await prisma.cart.findFirst({
    where: {
      id: cartItemId,
      userId: userId,
    },
    include: { product: true },
  });

  if (!cartItem) {
    logger.error(`[SERVICE - updateQuantity]: FAILED to find item ${cartItemId} for user ${userId}.`);
    throw new Error(`Cart item not found or you do not have permission to edit it.`);
  }

  // Calculate the new total based on the product's base price.
  const newTotal = cartItem.product.price.toNumber() * newQuantity;

  // Perform the update. The quantity is REPLACED, not added.
  return prisma.cart.update({
    where: {
      id: cartItemId,

    },
    data: {
      quantity: newQuantity,
      total: newTotal,
    },
    include: {
      product: true,
    },
  });
};



/**
 * Deletes a specific item from a user's cart.
 * Replaces your old `deleteCartItem`.
 * @param userId The ID of the user who owns the cart.
 * @param cartItemId The ID of the cart item to delete.
 */
export const deleteItemFromCart = async (
  userId: number,
  cartItemId: number
): Promise<{ message: string }> => {
  logger.debug(`User ${userId} attempting to delete cart item ${cartItemId}`);

  const deleteResult = await prisma.cart.deleteMany({
    where: {
      id: cartItemId,
      userId: userId, // CRITICAL: Ensures a user can only delete their own cart items.
    },
  });

  if (deleteResult.count > 0) {
    return { message: `Successfully deleted cart item.` };
  } else {

    throw new Error('Cart item not found or you do not have permission to delete it.');
  }
};

