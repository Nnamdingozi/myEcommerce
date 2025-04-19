// const { Product, Category } = require('../database/models');

// const createProduct = async(productData) => {
//     const newProduct = await Product.create(productData);
//     if(newProduct) {
//         return newProduct;
//     } else {
//         throw new Error('Product was not successfully created');
//     }
// };

// const getAllProducts = async() => {
//     const products = await Product.findAll({
//         limit: 15,
//         order: [['createdAt', 'ASC']]
//     });
//     if(products) {
//         return products
//     } else {
//         throw new Error('Product not found')
//     }
// };

// const getProductById = async (id) => {
// const product = await Product.findByPk(id);
// if(product) {
//     return product
// } else {
//     throw new Error('Product not found')
// }
// };

// const getAllCategories = async() => {
//     const categories = await Category.findAll();
//     if(categories) {
//         return categories
//     } else {
//         throw new Error('Categories not found')
//     }
// };

// const getProductByCategory = async(categoryId) => {
//     const products = await Product.findAll({where: 
//         {category_id: categoryId},
//         include: [
//             {
//                 model: Category,
//                 as: 'category', 
//             }
//         ]
//     });
//     if(products) {
//         return products;
//     } else {
//         throw new Error('Product not found')
//     }
//     };

//         const updateProduct = async (id, productData) => {
//             const [updated] = await Product.update(productData, {
//               where: { id: id }
//             });
//             return updated;
//           };

//         const deleteProduct = async(id) => {
//             const destroyProduct = await Product.destroy({where: { id }});
//             if(destroyProduct) {
//                 return true
//             } else {
//                 throw new Error('Product missing')
//             }
//             };

//             module.exports = {
//                 createProduct,
//                 getAllProducts,
//                 getProductById,
//                 getAllCategories,
//                 getProductByCategory,
//                 updateProduct,
//                 deleteProduct
//             }


// import  Product from "../database/models/product";
// import Category from "../database/models/category";
// import { ProductAttributes } from "../interface/ProductAttribute";



// export const createProduct = async (
//     productData: Omit<ProductAttributes, 'createdAt' | 'updatedAt'>
//   ): Promise<Product> => {
//     try {
//       const newProduct = await Product.create(productData);
//       return newProduct;
//     } catch (error: any) {
//       throw new Error(`Product creation failed: ${error.message}`);
//     }
//   };

// export const getAllProducts = async (): Promise<Product[]> => {
//   try {
//     return await Product.findAll({
//       limit: 15,
//       order: [["createdAt", "ASC"]],
//     });
//   } catch (error: any) {
//     throw new Error(`Error fetching products: ${error.message}`);
//   }
// };

// export const getProductById = async (id: number): Promise<Product | null> => {
//   try {
//     return await Product.findByPk(id);
//   } catch (error: any) {
//     throw new Error(`Error fetching product: ${error.message}`);
//   }
// };

// export const getAllCategories = async (): Promise<Category[]> => {
//   try {
//     return await Category.findAll();
//   } catch (error: any) {
//     throw new Error(`Error fetching categories: ${error.message}`);
//   }
// };

// export const getProductByCategory = async (categoryId: number): Promise<Product[]> => {
//   try {
//     return await Product.findAll({
//       where: { category_id: categoryId },
//       include: [
//         {
//           model: Category,
//           as: "category",
//         },
//       ],
//     });
//   } catch (error: any) {
//     throw new Error(`Error fetching products by category: ${error.message}`);
//   }
// };

// export const updateProduct = async (id: number, productData: Partial<ProductAttributes>): Promise<Product> => {
//   try {
//     const [updated] = await Product.update(productData, { where: { id } });
//     return updated;
//   } catch (error: any) {
//     throw new Error(`Error updating product: ${error.message}`);
//   }
// };

// export const deleteProduct = async (id: number): Promise<boolean> => {
//   try {
//     const destroyProduct = await Product.destroy({ where: { id } });
//     return destroyProduct > 0;
//   } catch (error: any) {
//     throw new Error(`Error deleting product: ${error.message}`);
//   }
// };


import Product from "../database/models/product";
import Category from "../database/models/category";
import { ProductAttributes, CategoryAttributes } from "../interface/ProductAttribute";

// Create a product and return plain object
export const createProduct = async (
  productData: Omit<ProductAttributes, 'createdAt' | 'updatedAt'>
): Promise<ProductAttributes> => {
  try {
    const newProduct = await Product.create(productData);
    return newProduct.get({ plain: true });
  } catch (error: any) {
    throw new Error(`Product creation failed: ${error.message}`);
  }
};

// Get all products as plain objects
export const getAllProducts = async (): Promise<ProductAttributes[]> => {
  try {
    const products = await Product.findAll({
      limit: 15,
      order: [["createdAt", "ASC"]],
    });

    if (!Array.isArray(products) || products.length === 0) {
      console.error("No products found or products is not an array.");
      return [];
    }
console.log('product in service:', products)
    const plainProducts = products
      .filter((product): product is InstanceType<typeof Product> => product && typeof product.get === 'function')
      .map((product) => product.get({ plain: true }));

    return plainProducts as ProductAttributes[];


  } catch (error: any) {
    throw new Error(`Error fetching products: ${error.message}`);
  }
};



// Get one product as a plain object
export const getProductById = async (id: number): Promise<ProductAttributes | null> => {

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      console.error("No product found.");
      return null;
    }

    return product.get({ plain: true })
  } catch (error: any) {
    throw new Error(`Error fetching product: ${error.message}`);
  }
};

// Get all categories as plain objects
export const getAllCategories = async (): Promise<CategoryAttributes[]> => {
  try {
    const categories = await Category.findAll();

    if (!categories || categories.length === 0) {
      console.error("No categories found.");
      return [];
    }
    return categories.map(category => category.get({ plain: true }));
  } catch (error: any) {
    throw new Error(`Error fetching categories: ${error.message}`);
  }
};

// Get products by category as plain objects
export const getProductByCategory = async (categoryId: number): Promise<ProductAttributes[]> => {
  try {
    const products = await Product.findAll({
      where: { category_id: categoryId },
      include: [
        {
          model: Category,
          as: "category",
        },
      ],
    });

    if (!products || products.length === 0) {
      console.error("No products found that match this category.");
      return [];
    }


    return products.map(product => product.get({ plain: true }));
  } catch (error: any) {
    throw new Error(`Error fetching products by category: ${error.message}`);
  }
};

// Update product and return updated plain object
export const updateProduct = async (id: number, productData: Partial<ProductAttributes>): Promise<ProductAttributes | null> => {

  try {
    await Product.update(productData, { where: { id } });
    const updated = await Product.findByPk(id);

    if (!updated) {
      console.error("No product was updated.");
      return null;
    }

    return updated.get({ plain: true })
  } catch (error: any) {
    throw new Error(`Error updating product: ${error.message}`);
  }
};

// Delete product and return boolean
export const deleteProduct = async (id: number): Promise<boolean> => {
  try {
    const destroyProduct = await Product.destroy({ where: { id } });
    return destroyProduct > 0;
  } catch (error: any) {
    throw new Error(`Error deleting product: ${error.message}`);
  }
};
