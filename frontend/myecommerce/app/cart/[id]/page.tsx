

import { CartProvider } from '@/app/context/cartContext'
import CartContent from '@/app/context/cartUwrapper'
import { fetchUserCart } from '../../lib/data';
import { NewCart } from '@/app/lib/definition';
import { OrderProvider } from '@/app/context/orderContext';

const CartPage: React.FC = async (): Promise<JSX.Element> => {
    const cartValue: NewCart[] | undefined = await fetchUserCart()
    return (
        <CartProvider  initialCart = {cartValue}>
            < OrderProvider>
            <CartContent />
            </OrderProvider>
         
        </CartProvider>
    )
};
export default CartPage;