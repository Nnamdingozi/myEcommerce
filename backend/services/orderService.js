const { Cart, Order, OrderItem, Product } = require('../database/models');


const createOrder = async (userId, paymentMtd, shippingAddy, shippingMtd, curr) => {
    const cartItems = await Cart.findAll({
        where: { user_id: userId },
        include: [{
            model: Product,
            as: 'cartproduct',
        }],

    });


    const totalAmount = cartItems.reduce((acc, cartItem) => {
        return acc + parseFloat(cartItem.total)
    }, 0);
    if (totalAmount === 0) {
        throw new Error('Cart is empty')
    }

    const trackingNumber = () => {
        return Math.floor(Math.random() * 1000000)
    }
    const newNum = trackingNumber().toString();
    console.log({
        user_id: userId,
        status: 'pending',
        total_amount: totalAmount,
        payment_status: 'pending',
        payment_method: paymentMtd,
        shipping_address: shippingAddy,
        shipping_method: shippingMtd,
        tracking_number: newNum,
        currency: curr,

    })

    const order = await Order.create({
        user_id: userId,
        status: 'pending',
        total_amount: totalAmount,
        payment_status: 'pending',
        payment_method: paymentMtd,
        shipping_address: shippingAddy,
        shipping_method: shippingMtd,
        tracking_number: newNum,
        currency: curr,
    });

    const orderItems = cartItems.map(cartItem => ({
        order_id: order.id,
        product_id: cartItem.product_id,
        quantity: cartItem.quantity

    }));
    await OrderItem.bulkCreate(orderItems);
    await Cart.destroy({ where: { user_id: userId } })
    return order;
};

const getAllOrder = async (userId) => {
    const orders = await Order.findAll({
        where: { user_id: userId },
            include: [{
                model: OrderItem,
                as: 'order'
        }],
        order: [['createdAt', 'DESC']]
    });
    if (!orders) {
        throw new Error('order not found')
    } else {
        return orders
    }
};

const getOrderById = async (orderId, userId) => {
    const order = await Order.findOne({
         where: { 
            id: orderId,
            user_id: userId
            
         },
         include: [{
            model: OrderItem,
            as: 'order',
            
         }]
         });
         if(!order) {
            return null;
         } else {return order}

}

module.exports = {
    createOrder,
    getAllOrder,
    getOrderById
}


