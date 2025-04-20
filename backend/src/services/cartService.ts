
import  Cart  from '../database/models/cart';
import  Product  from '../database/models/product';


// Define function parameter and return types
export const addItemsToCart = async (
  userId: number,
  productId: number
): Promise< Cart> => {
  try {
    if (!userId || !productId) {
      throw new Error('userId and productId required');
    }

    // Look for an existing cart item with product details included
    const cartItem = await Cart.findOne({
      where: { user_id: userId, product_id: productId },
      include: [
        {
          model: Product,
          as: 'cartproduct',
          attributes: ['id', 'name', 'price', 'description', 'image_url'],
        },
      ],
    });

    if (cartItem) {
      throw new Error('Item exists in cart. Use update to change the quantity');
    }

    // Create the cart item
    const newItem = await Cart.create({
      user_id: userId,
      product_id: productId,
    });

    // Fetch the newly created item with product details
    const addedItem = await Cart.findOne({
      where: { id: newItem.id },
      include: [
        {
          model: Product,
          as: 'cartproduct',
          attributes: ['id', 'name', 'price', 'description', 'image_url'],
        },
      ],
    });

    if (!addedItem) {
      throw new Error('Failed to retrieve added cart item');
    }
    return addedItem;
  } catch (err: any) {
    throw new Error(`Error adding item to cart: ${err.message}`);
  }
};

export const getItemByUserId = async (userId: number): Promise<Cart[]> => {
  if (typeof userId !== 'number') {
    console.error(`Invalid userId provided: ${userId}`);
    throw new Error('Invalid user ID. Must be a number.');
  }

  const userCart = await Cart.findAll({
    where: { user_id: userId },
    include: [
      {
        model: Product,
        as: 'cartproduct',
        attributes: ['id', 'name', 'price', 'description', 'image_url'],
      },
    ],
    attributes: ['id', 'user_id', 'product_id', 'quantity', 'total'],
  });

  if (!userCart || userCart.length === 0) {
    console.log('User has no cart Items');
    throw new Error('Cart not found for this user');
  }
  return userCart;
};

export const getCartItemById = async (id: number): Promise<Cart> => {
  const item = await Cart.findByPk(id);
  if (!item) {
    throw new Error('CartItem not found');
  }
  console.log('Cart item found');
  return item;
};

export const updateCartItems = async (
  cartItemId: number,
  quantity: number,
  userId: number
): Promise<{ id: number; quantity: number; total: string }> => {
  if (!userId) {
    throw new Error('UserId not authenticated');
  }

  const cartItem = await Cart.findOne({
    where: {
      id: cartItemId,
      user_id: userId,
    },
  });

  if (!cartItem) {
    throw new Error('Cart not found');
  } else {
    console.log('Cart found');
  }

  cartItem.quantity = quantity;
  await cartItem.save();

  return {
    id: cartItem.id,
    quantity: cartItem.quantity,
    total: parseFloat(cartItem.total as any || '0').toFixed(2),
  };
};

export const deleteCartItem = async (
  userId: number,
  cartItemId: number
): Promise<{ message: string }> => {
  if (!userId) {
    throw new Error('User not found');
  }

  const deleteCount = await Cart.destroy({
    where: {
      user_id: userId,
      id: cartItemId,
    },
  });

  if (deleteCount > 0) {
    return { message: `Successfully deleted ${deleteCount} cart item(s)` };
  } else {
    throw new Error('Cart not found');
  }
};
