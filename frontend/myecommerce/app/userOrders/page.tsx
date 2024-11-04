import { OrderProvider } from "../context/orderContext";
import OrderDisplay from "../ui/orderDisplay";

const OrderDisplayPage = () => {
    return (
        <OrderProvider>
        <OrderDisplay />
        </OrderProvider>
        
    )
}

export default OrderDisplayPage;