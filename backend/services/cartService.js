

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

const { Cart, Product, } = require('../database/models');
console.log('product, cart accessed');

const addItemsToCart = async (productId, userId, quantity) => {
    console.log('Service - userId:', userId, 'productId:', productId);
    try {
        if (!userId || !productId) {
            throw new Error('userId and productId required');
        }

        let cartItem = await Cart.findOne({
            where: { user_id: userId, product_id: productId },
            include: [
                {
                    model: Product,
                    as: 'cartproduct',
                    attributes: ['id', 'name', 'price', 'description', 'image_url' ]
                }
            ]
        });
        if (cartItem) {
            throw new Error('item exists in cart. Use  update to change the quantity');
        } else {

            await Cart.create({
                user_id: userId,
                product_id: productId,
                quantity,
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

const getItemByUserId = async (userId) => {
    const userCart = await Cart.findAll({
        where: { user_id: userId },
        include: [
            {
                model: Product,
                as: 'cartproduct',
                attributes: [ 'name', 'price', 'description', 'image_url' ]
            }
        ],
        attributes: ['user_id', 'product_id', 'quantity', 'total']
    });
    if(!userCart) {
        console.log('User has no cart Items');
        throw new Error('Cart not found for this user')
    }
    return userCart;
}
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

const updateCartItems = async (userId, id, quantity) => {
    if(!userId) {
        throw new Error('UserId not authenticated')
    }

    let cartItem = await Cart.findByPk(id);

    if (!cartItem) {
        throw new Error('Cart not found')
    } else {
        console.log('Cart found');
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    return {
        id: cartItem.id,
        quantity: cartItem.quantity
    };
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
    getItemByUserId,
    getCartItemsById,
    updateCartItems,
    deleteCartItem
}