import OrderForm from "../../ui/order";
import { OrderProvider } from "../../context/orderContext";

const OrderPage = () => {
    return (
        <OrderProvider>
        <OrderForm/>
        </OrderProvider>
    )
};

export default OrderPage