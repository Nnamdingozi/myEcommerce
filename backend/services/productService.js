const { Product } = require('../database/models');

const createProduct = async(productData) => {
    const newProduct = await Product.create(productData);
    if(newProduct) {
        return newProduct;
    } else {
        throw new Error('Product was not successfully created');
    }
};
       
const getProductById = async (id) => {
const product = await Product.findByPk(id);
if(product) {
    return product
} else {
    throw new Error('Product not found')
}
};

const getProductByCategory = async(categoryId) => {
    const products = await Product.findAll({where: {category_id: categoryId}});
    if(products) {
        return products;
    } else {
        throw new Error('Product not found')
    }
    };

        const updateProduct = async (id, productData) => {
            const [updated] = await Product.update(productData, {
              where: { id: id }
            });
            return updated;
          };

        const deleteProduct = async(id) => {
            const destroyProduct = await Product.destroy({where: { id }});
            if(destroyProduct) {
                return true
            } else {
                throw new Error('Product missing')
            }
            };

            module.exports = {
                createProduct,
                getProductById,
                getProductByCategory,
                updateProduct,
                deleteProduct
            }