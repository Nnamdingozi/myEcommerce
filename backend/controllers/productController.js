const {createProduct,
    getAllProducts,
    getProductById,
    getAllCategories,
    getProductByCategory,
    updateProduct,
    deleteProduct } = require('../services/productService');

    const createProductHandler = async (req, res) => {
        try {
            const { name, merchant_id, price, status, category_id, createdAt, updatedAt, description, image_url } = req.body;
       
            const newProduct = await createProduct({
          name,
          merchant_id,
          price,
          status,
          category_id,
          createdAt,
          updatedAt,
          description,
          image_url
         
            });
            res.status(201).json(newProduct);
        } catch (err) {
            res.status(500).json({ error: err.message })
    
        }
    };
   
    const getAllProductsHandler = async (req, res) => {
        try {
const getProducts = await getAllProducts();
res.status(200).json(getProducts)
        } catch (err) {
            res.status(500).json({ error: err.message })
    
        }

    }
const getProductByIdHandler = async (req, res) => {
    try {
        const getProduct = await getProductById(req.params.id);
        res.status(200).json(getProduct)
    } catch (err) {
        res.status(500).json({ error: err.message })

    }
};
const getAllCategoriesHandler = async (req, res) => {
try {
    const categories = await getAllCategories();
    res.status(200).json(categories);

} catch (err) {
    res.status(500).json({ error: err.message })

}
}

const getProductByCategoryIdHandler = async (req, res) => {
    try {
        
        const getProduct = await getProductByCategory(req.params.id);
        console.log(getProduct)
        res.status(200).json(getProduct)
    } catch (err) {
        res.status(500).json({ error: err.message })

    }
};

const updateProductHandler = async (req, res) => {
    try {
        const updatedProduct = await updateProduct(req.params.id, req.body);
        res.status(200).json(updatedProduct)
    } catch (err) {
        res.status(500).json({ error: err.message })

    }
};

const deleteProductHandler = async (req, res) => {
    try {
        const deletedProduct = await deleteProduct(req.params.id);
        if(deletedProduct) {
            res.status(204).json()
        } else {
            res.status(404).json({message: 'Product does not exist'})
        }
        
    } catch (err) {
        res.status(500).json({ error: err.message })

    }
};

module.exports = {
    createProductHandler,
    getAllProductsHandler,
    getProductByIdHandler,
    getAllCategoriesHandler,
    getProductByCategoryIdHandler,
    updateProductHandler,
    deleteProductHandler
};