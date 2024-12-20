
import { addItemsToCart, fetchUserCart, updateCartItem, deleteUserItem } from '@/app/lib/data';
import { NewCart } from '@/app/lib/definition';


interface CartHookLogicProps {
  setCart: React.Dispatch<React.SetStateAction<NewCart[] | []>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;

};
export const cartHookLogic = ({
  setCart,
  setLoading,
  setError,
}: CartHookLogicProps) => {
  const getUserCart = async (token: string): Promise<NewCart[] | [] | undefined> => {
    if (!token) {
      console.warn('No token provided. Skipping fetch cart request.');
      return undefined;
    }

    setLoading(true);
    try {
      const items: NewCart[] = await fetchUserCart(token) || [];
      setCart(items);
    } catch (err) {
      setError('Failed to fetch cart items');
    } finally {
      setLoading(false);
    }
  };


  const addToCart = async (
    token: string,
    productId: number,
    quantity: number = 1
  ): Promise<NewCart | null> => {
    if (!token) {
      alert('Log in to Add Items to Cart');
      return null;
    }
  
    try {
      const newItem = await addItemsToCart(token, productId, quantity);
      if (!newItem) {
        throw new Error('Failed to add item to cart');
      }
      // Refresh the cart to reflect changes
      await getUserCart(token);
      return newItem; // Return the newly added item
    } catch (err) {
      console.error('Failed to add item to cart', err);
      alert('Failed to add item to cart');
      return null;
    }
  };
  

  const removeItemFromCart = async (token: string, cartItemId: number): Promise<void> => {
    if (!token) {
      console.warn('No token provided. Skipping remove item request.');
      return;
    }

    try {
      const deleted = await deleteUserItem(token, cartItemId);
      if (deleted) {
        // Refresh the cart to reflect changes
        await getUserCart(token);
      } else {
        console.error('Failed to delete item from server');
      }
    } catch (err) {
      console.error('Failed to remove item from cart', err);
    }
  };

  const newQuantity = async (token: string, cartItemId: number, newqty: number): Promise<void> => {
    if (newqty < 1) {
      console.warn('Quantity must be at least 1');
      return;
    }

    try {
      await updateCartItem(token, cartItemId, newqty);
      // Refresh the cart to reflect changes
      await getUserCart(token);
    } catch (err) {
      console.error('Failed to update item quantity', err);
    }
  };

  return { getUserCart, addToCart, removeItemFromCart, newQuantity };
};
