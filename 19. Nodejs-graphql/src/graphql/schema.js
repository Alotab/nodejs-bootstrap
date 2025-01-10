// This file will define how the data structure will look

const {gql} = require('graphql-tag');

const typeDefs = gql`
    type Product {
        id: ID!
        title: String!
        category: String!
        price: Float!
        inStock: Boolean
    }

    type Query {
        products: [Product!]!
        product(id: ID!): Product
    }

    type DeleteProductResponse {
        success: Boolean!
        message: String!
        product: Product
    }

    type Mutation{
        createProduct(
            title: String!
            category: String!
            price: Float!
            inStock: Boolean!
        ): Product
        deleteProduct(id: ID!): DeleteProductResponse
        updateProduct(
            id: ID!
            title: String
            category: String
            price: Float
            inStock: Boolean
        ): Product
    }
`;

module.exports = typeDefs;