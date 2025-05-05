'use client'

import UserOrderDisplay from "@/app/ui/orderDisplay";
import { useOrderContext } from "@/app/context/orderContext";


const OrderDisplayPage = () => {

    const { userOrder, isLoading, error } = useOrderContext();

    if (isLoading) {
        return <p>Loading ...</p>
    };

    if (error) {
        return <p>Error: {error}</p>
    };

    if (!userOrder) {
        return <p> No Orders found</p>
    };

    return (

        <UserOrderDisplay userOrder={userOrder} />
    )
};


export default OrderDisplayPage