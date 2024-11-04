


const { Cart, Product, } = require('../database/models');
console.log('product, cart accessed');

const addItemsToCart = async (userId, productId) => {
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
            });
        }
        return 'item successuflly added';

    } catch (err) {
        throw new Error(`Error adding item to cart: ${err.message}`);
    }

};


const getItemByUserId = async (userId) => {
    console.log('service userId for getCart: ', userId)
    if(typeof userId !== 'number') {
        console.error(`Invalid userId provided: ${userId}`); 
        throw new Error('Invalid user ID. Must be a number.');
    }
    
    const userCart = await Cart.findAll({
        where: { user_id: userId },
        include: [
            {
                model: Product,
                as: 'cartproduct',
                attributes: [ 'id', 'name', 'price', 'description', 'image_url' ]
            }
        ],
        attributes: [ 'id', 'user_id', 'product_id', 'quantity', 'total']
    });
    if(!userCart || userCart.length === 0) {
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

const updateCartItems = async (cartItemId, quantity, userId) => {
    console.log(`userId, productId and quantity in updateCartItems service: cartitemId: ${cartItemId}, quantitty: ${quantity}, userId: ${userId}`)
    if(!userId) {
        throw new Error('UserId not authenticated')
    }

    let cartItem = await Cart.findOne({
        where: {
            id: cartItemId,
            user_id: userId,
    
        }
    });

    if (!cartItem) {
        throw new Error('Cart not found')
    } else {
        console.log('Cart found');
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    return {
        id: cartItem.id,
        quantity: cartItem.quantity,
        total: parseFloat(cartItem.total || 0).toFixed(2) 
    };
};

// delete cart items

const deleteCartItem = async (userId, cartItemId) => {
    console.log('userId in service, deleteCartItem:', userId + 'cartItemId in service, deleteCartItem:', cartItemId)
    if(!userId) {
        throw new Error('User not found')
    }

    const deleteCart = await Cart.destroy({
         where: { 
            user_id: userId,
            id: cartItemId
         } })
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