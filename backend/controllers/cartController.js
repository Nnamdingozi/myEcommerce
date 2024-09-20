const {addItemsToCart, getItemByUserId, getCartItemsById, updateCartItems, deleteCartItem} = require('../services/cartService');

const addItemsHandler = async (req, res) => {
    console.log( req.body)
    
        const { quantity, product_id } = req.body;
        const {user_id} = req.params;
        console.log('Controller - userId:', user_id, 'productId:', product_id, 'quantity:', quantity);
        try {
        const newItem = await addItemsToCart(quantity, user_id, product_id);
        if (newItem) {
            res.status(201).json(newItem);
        } else {
            res.status(400).json({message: 'Unable to add item to cart'})
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
  
    }
};

// const calcCartTotalHandler = async (req, res) => {
//     try {
//         const { user_id } = req.body;
//     const calcTotal = calcCartTotal(user_id);
//     res.status(200).json({ calcTotal })

//     } catch (err) {
//         res.status(500).json({ error: err.message })
  
//     }
// };
    
const getItemByUserIdHandler = async(req, res) => {
    const {userId} = req.params;
try {
    const userCart = await getItemByUserId(userId);
    console.log('Users cart found:', userCart);
    res.status(200).json(userCart);

} catch (err) {
    res.status(500).json({error: err.message})
}
};
const getCartItemsByIdHandler = async (req, res) => {
   
    try {
        const item = await getCartItemsById(req.params.id);
        if(item) {
            res.status(200).json(item)
        } else {
            res.status(404).json()
        }
    } catch(err) {
        res.status(500).json({error: err.message})
    }
};

const updateCartItemsHandler = async (req, res) => {
    try{
        const updatedItem = await updateCartItems(req.params.id, req.body.quantity);
        if(updatedItem) {
            res.status(200).json(updatedItem);
        } else {
            res.status(404).json({error: 'Item not found'})
        }

    }catch (err){
        res.status(500).json({error: err.message})
    }
};

const deleteCartItemHandler = async (req, res) => {
    try {
        const deletedItem = await deleteCartItem(req.params.id);
        if(deletedItem) {
            res.status(204).json()
        } else {
            res.status(404).json({error: 'Item not found'})
        }

    } catch (err){
        res.status(500).json({error: err.message})
    }
};

module.exports = {
    addItemsHandler,
    getItemByUserIdHandler,
    getCartItemsByIdHandler,
    updateCartItemsHandler,
    deleteCartItemHandler
};
