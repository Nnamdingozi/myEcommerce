

// const addItemsToCart = async (quantity, userId, productId) => {
// const product = await Product.findByPk(productId);

// if(!product) {
//     throw new Error('Product not found')
// }

// const price = product.price;
//  const total = price * quantity;
// const newCartItem = await Cart.create({
//     quantity, 
//     user_id: userId,
//     product_id: productId,
//     total


// });
// return newCartItem;

// };

// // const addItemsToCart = async (cartData) => {
// //     const product = Product.findByPk(cartData.product_id);
// //     if(!product) {
// //             throw new Error('Product not found')
// //          }

// //          const price = product.price;
// //          const total = price * quantity;
//          const newCartItem = await Cart.create(cartData);
//          return newCartItem;

// }

const { Cart, Product } = require('../database/models');
console.log('product, cart accessed');

const addItemsToCart = async (quantity, userId, productId) => {
    console.log('Service - userId:', userId, 'productId:', productId, 'quantity:', quantity);
    try {
        if (!userId || !productId) {
            throw new Error('userId and productId required');
        }

        let cartItem = await Cart.findOne({
            where: { user_id: userId, product_id: productId }
        });
        if (cartItem) {
            throw new Error('item exists in cart. Use  update to change the quantity');
        } else {

            await Cart.create({
                quantity: quantity,
                user_id: userId,
                product_id: productId,
            });
        }
        return 'item successuflly added';

    } catch (err) {
        throw new Error(`Error adding item to cart: ${err.message}`);
    }

};

// const calcCartTotal = async (userId) => {
//     try {

//         const cartItems = await Cart.findOne({
//         where: {user_id: userId},
//         include: [{
//             model: Product,
//             as: 'cartproduct',
//             attribute: ['price']
//         }]
//         });
//         const total = cartItems.reduce((acc, item)=> {
//             return acc + (item.quantity * item.cartproduct.price)
//         }, 0);
//         return total;
//     } catch (err) {
//         throw new Error(`Errror calculating cart total: ${err.message}`)
//     }
// };


//  get item from cart
const getCartItemsById = async (id) => {
    const item = await Cart.findByPk(id);
    if (item) {
        console.log('Cart item found');
    } else {
        throw new Error('CartItem not found')
    }
    return item
};
// update cart Items

const updateCartItems = async (id, quantity) => {

    let cartItem = await Cart.findByPk(id);

    if (!cartItem) {
        throw new Error('Cart not found')
    } else {
        console.log('Cart found');
    }
    
    cartItem.quantity = quantity;
    await cartItem.save();

    return cartItem;
};

// delete cart items

const deleteCartItem = async (id) => {
    const deleteCart = await Cart.destroy({ where: { id } })
    if (deleteCart) {
        return deleteCart;
    } else {
        throw new Error('Cart not found')
    }
};

module.exports = {
    addItemsToCart,
    getCartItemsById,
    updateCartItems,
    deleteCartItem
}