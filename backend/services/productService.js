const { Product, Category } = require('../database/models');

const createProduct = async(productData) => {
    const newProduct = await Product.create(productData);
    if(newProduct) {
        return newProduct;
    } else {
        throw new Error('Product was not successfully created');
    }
};

const getAllProducts = async() => {
    const products = await Product.findAll({
        limit: 15,
        order: [['createdAt', 'ASC']]
    });
    if(products) {
        return products
    } else {
        throw new Error('Product not found')
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

const getAllCategories = async() => {
    const categories = await Category.findAll();
    if(categories) {
        return categories
    } else {
        throw new Error('Categories not found')
    }
};

const getProductByCategory = async(categoryId) => {
    const products = await Product.findAll({where: 
        {category_id: categoryId},
        include: [
            {
                model: Category,
                as: 'category', // use the alias specified in your association
            }
        ]
    });
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
                getAllProducts,
                getProductById,
                getAllCategories,
                getProductByCategory,
                updateProduct,
                deleteProduct
            }