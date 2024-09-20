'use client'

import { Cart } from '@/app/lib/definition';
import  CartItems  from '@/app/ui/cart';
import { useParams } from 'next/navigation';

const CartPage = async() => {


    const { userId } = useParams();
    const userIdNumber = Number(userId);
return (
    <div>
        <CartItems userId={userIdNumber} />
    </div>
)
}
export default CartPage;