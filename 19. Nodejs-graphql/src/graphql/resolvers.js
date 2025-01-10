// const products = require('../data/products');
const Product = require("../models/Product")

const resolvers = {
    Query: {
        products: async () => await Product.find({}),
        // product: (_, {id}) => products.find(item => item.id === id)
        product: async(_, {id}) => await Product.findById(id)
    },

    Mutation: {
        createProduct: async(_, args)=> {
            const newlyCreatedProduct = new Product(args);

            return await newlyCreatedProduct.save();
        },
        updateProduct: async(_, {id, ...updateFormFields})=> {
            return await Product.findByIdAndUpdate(id, updateFormFields, {new : true})
        },
        deleteProduct: async (_, { id }) => {
            try {
                const deletedProduct = await Product.findByIdAndDelete(id);
    
                if (!deletedProduct) {
                    throw new Error('Product not found or already deleted');
                }
    
                return {
                    success: true,
                    message: 'Product deleted successfully',
                    product: deletedProduct
                };
            } catch (error) {
                throw new Error('Error deleting product: ' + error.message);
            }
        }
        // createProduct: (_, {title, category, price, inStock}) => {
        //     const newlyCreatedProduct = {
        //         id: String(products.length +1),
        //         title,
        //         category,
        //         price,
        //         inStock
        //     }

        //     products.push(newlyCreatedProduct);
        //     return newlyCreatedProduct;
        // },

        // deleteProduct: (_, {id})=> {
        //     const index = products.findIndex(product => product.id === id);
        //     if(index === -1) return false

        //     products.splice(index, 1);

        //     return true;
        // },

        // updateProduct: (_, {id, ...updates})=>{
        //     const index = products.findIndex(product => product.id === id);
        //     if(index === -1) return null;

        //     const updateProduct = {
        //         ...products[index], ...updates
        //     }

        //     products[index] = updateProduct;

        //     return updateProduct;



        // }
    }
};

module.exports = resolvers;