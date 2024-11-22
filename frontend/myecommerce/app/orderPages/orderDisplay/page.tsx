'use client'

import { useEffect } from "react";
import UserOrderDisplay from "@/app/ui/orderDisplay";
import { useOrderContext } from "@/app/context/orderContext";
 import {useUser} from '@/app/context/userContext'



const OrderDisplayPage = () => {
    const {token} = useUser();
    const {getUserOrder, userOrder, isLoading, error } = useOrderContext();


useEffect(()=> {
 getUserOrder(token!);

    console.log('user order fron getUserOrder useEffect:', userOrder)
}, []);


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

        <UserOrderDisplay
        userOrder={userOrder}
        />
      
    )
};

export default OrderDisplayPage