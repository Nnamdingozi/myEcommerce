const {addItemsToCart, getItemByUserId, getCartItemsById, updateCartItems, deleteCartItem} = require('../services/cartService');

const addItemsHandler = async (req, res) => {
    console.log('Route /cart reached with data:', req.body);
    console.log('received from frontend in body', req.body);
    console.log('received from frontend in req.user:', req.user)
    
        const {productId} = req.body
        const userId = req.user.id;
        console.log('Controller - userId:', userId, 'productId:', productId );
        try {
        const newItem = await addItemsToCart( userId, productId);
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
    console.log('getItemByUserIdHandler by', req.user)
    const userId = req.user? req.user.id : null;
    console.log('controller userId for getCart:', userId)
    if(!userId) {
        return res.status(400).json('userId required')
    }
    
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
        const userId = req.user.id;
    const { id }= req.params;
        const {quantity} = req.body;
        const updatedItem = await updateCartItems(id, quantity, userId);
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
    console.log('deleteCart handler hit in backend')
    const userId = req.user.id;
    const cartItemId = req.params.cartItemId;
    console.log('userId in controller, deleteCartItem:', userId + 'cartItemId in controller, deleteCartItem:', cartItemId)
    try {
        const deletedItem = await deleteCartItem(userId, cartItemId);
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
