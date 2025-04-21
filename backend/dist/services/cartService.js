"use strict";
// const { Cart, Product, } = require('../database/models');
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCartItem = exports.updateCartItems = exports.getCartItemById = exports.getItemByUserId = exports.addItemsToCart = void 0;
// const addItemsToCart = async (userId, productId) => {
//     try {
//         if (!userId || !productId) {
//             throw new Error('userId and productId required');
//         }
//         let cartItem = await Cart.findOne({
//             where: { user_id: userId, product_id: productId },
//             include: [
//                 {
//                     model: Product,
//                     as: 'cartproduct',
//                     attributes: ['id', 'name', 'price', 'description', 'image_url']
//                 }
//             ]
//         });
//         if (cartItem) {
//             throw new Error('Item exists in cart. Use update to change the quantity');
//         }
//         // Create the cart item
//         const newItem = await Cart.create({
//             user_id: userId,
//             product_id: productId,
//         });
//         // Fetch the newly created item with product details
//         const addedItem = await Cart.findOne({
//             where: { id: newItem.id },
//             include: [
//                 {
//                     model: Product,
//                     as: 'cartproduct',
//                     attributes: ['id', 'name', 'price', 'description', 'image_url']
//                 }
//             ]
//         });
//         return addedItem;
//     } catch (err) {
//         throw new Error(`Error adding item to cart: ${err.message}`);
//     }
// };
// const getItemByUserId = async (userId) => {
//     if(typeof userId !== 'number') {
//         console.error(`Invalid userId provided: ${userId}`); 
//         throw new Error('Invalid user ID. Must be a number.');
//     }
//     const userCart = await Cart.findAll({
//         where: { user_id: userId },
//         include: [
//             {
//                 model: Product,
//                 as: 'cartproduct',
//                 attributes: [ 'id', 'name', 'price', 'description', 'image_url' ]
//             }
//         ],
//         attributes: [ 'id', 'user_id', 'product_id', 'quantity', 'total']
//     });
//     if(!userCart || userCart.length === 0) {
//         console.log('User has no cart Items');
//         throw new Error('Cart not found for this user')
//     }
//     return userCart;
// }
// //  get item from cart
// const getCartItemsById = async (id) => {
//     const item = await Cart.findByPk(id);
//     if (item) {
//         console.log('Cart item found');
//     } else {
//         throw new Error('CartItem not found')
//     }
//     return item
// };
// // update cart Items
// const updateCartItems = async (cartItemId, quantity, userId) => {
//     if(!userId) {
//         throw new Error('UserId not authenticated')
//     }
//     let cartItem = await Cart.findOne({
//         where: {
//             id: cartItemId,
//             user_id: userId,
//         }
//     });
//     if (!cartItem) {
//         throw new Error('Cart not found')
//     } else {
//         console.log('Cart found');
//     }
//     cartItem.quantity = quantity;
//     await cartItem.save();
//     return {
//         id: cartItem.id,
//         quantity: cartItem.quantity,
//         total: parseFloat(cartItem.total || 0).toFixed(2) 
//     };
// };
// // delete cart items
// const deleteCartItem = async (userId, cartItemId) => {
//     if(!userId) {
//         throw new Error('User not found')
//     }
//     const deleteCart = await Cart.destroy({
//          where: { 
//             user_id: userId,
//             id: cartItemId
//          } })
//          if (deleteCart > 0) {
//             return { message: `Successfully deleted ${deleteCart} cart item(s)` };
//           } else {
//             throw new Error('Cart not found');
//           }
// };
// module.exports = {
//     addItemsToCart,
//     getItemByUserId,
//     getCartItemsById,
//     updateCartItems,
//     deleteCartItem
// }
const cart_1 = __importDefault(require("../database/models/cart"));
const product_1 = __importDefault(require("../database/models/product"));
// import { Op } from 'sequelize';
// Define function parameter and return types
const addItemsToCart = async (userId, productId) => {
    try {
        if (!userId || !productId) {
            throw new Error('userId and productId required');
        }
        // Look for an existing cart item with product details included
        const cartItem = await cart_1.default.findOne({
            where: { user_id: userId, product_id: productId },
            include: [
                {
                    model: product_1.default,
                    as: 'cartproduct',
                    attributes: ['id', 'name', 'price', 'description', 'image_url'],
                },
            ],
        });
        if (cartItem) {
            throw new Error('Item exists in cart. Use update to change the quantity');
        }
        // Create the cart item
        const newItem = await cart_1.default.create({
            user_id: userId,
            product_id: productId,
        });
        // Fetch the newly created item with product details
        const addedItem = await cart_1.default.findOne({
            where: { id: newItem.id },
            include: [
                {
                    model: product_1.default,
                    as: 'cartproduct',
                    attributes: ['id', 'name', 'price', 'description', 'image_url'],
                },
            ],
        });
        if (!addedItem) {
            throw new Error('Failed to retrieve added cart item');
        }
        return addedItem;
    }
    catch (err) {
        throw new Error(`Error adding item to cart: ${err.message}`);
    }
};
exports.addItemsToCart = addItemsToCart;
const getItemByUserId = async (userId) => {
    if (typeof userId !== 'number') {
        console.error(`Invalid userId provided: ${userId}`);
        throw new Error('Invalid user ID. Must be a number.');
    }
    const userCart = await cart_1.default.findAll({
        where: { user_id: userId },
        include: [
            {
                model: product_1.default,
                as: 'cartproduct',
                attributes: ['id', 'name', 'price', 'description', 'image_url'],
            },
        ],
        attributes: ['id', 'user_id', 'product_id', 'quantity', 'total'],
    });
    if (!userCart || userCart.length === 0) {
        console.log('User has no cart Items');
        throw new Error('Cart not found for this user');
    }
    return userCart;
};
exports.getItemByUserId = getItemByUserId;
const getCartItemById = async (id) => {
    const item = await cart_1.default.findByPk(id);
    if (!item) {
        throw new Error('CartItem not found');
    }
    console.log('Cart item found');
    return item;
};
exports.getCartItemById = getCartItemById;
const updateCartItems = async (cartItemId, quantity, userId) => {
    if (!userId) {
        throw new Error('UserId not authenticated');
    }
    const cartItem = await cart_1.default.findOne({
        where: {
            id: cartItemId,
            user_id: userId,
        },
    });
    if (!cartItem) {
        throw new Error('Cart not found');
    }
    else {
        console.log('Cart found');
    }
    cartItem.quantity = quantity;
    await cartItem.save();
    return {
        id: cartItem.id,
        quantity: cartItem.quantity,
        total: parseFloat(cartItem.total || '0').toFixed(2),
    };
};
exports.updateCartItems = updateCartItems;
const deleteCartItem = async (userId, cartItemId) => {
    if (!userId) {
        throw new Error('User not found');
    }
    const deleteCount = await cart_1.default.destroy({
        where: {
            user_id: userId,
            id: cartItemId,
        },
    });
    if (deleteCount > 0) {
        return { message: `Successfully deleted ${deleteCount} cart item(s)` };
    }
    else {
        throw new Error('Cart not found');
    }
};
exports.deleteCartItem = deleteCartItem;
