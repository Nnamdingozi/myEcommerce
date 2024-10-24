

import { CartProvider } from '@/app/context/cartContext'
import CartContent from '@/app/context/cartUwrapper'
import { fetchUserCart } from '../../lib/data';
import { NewCart } from '@/app/lib/definition';


const CartPage: React.FC = async (): Promise<JSX.Element> => {
    const cartValue: NewCart[] | undefined = await fetchUserCart()
    return (
        <CartProvider  initialCart = {cartValue}>
            <CartContent />
        </CartProvider>
    )
};
export default CartPage;