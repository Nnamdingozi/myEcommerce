'use client'

import { useEffect } from "react";
import UserOrderDisplay from "@/app/ui/orderDisplay";
import { useOrderContext } from "@/app/context/orderContext";



const OrderDisplayPage = () => {
    const {getUserOrder, userOrder, isLoading, error } = useOrderContext();


useEffect(()=> {
 getUserOrder();

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