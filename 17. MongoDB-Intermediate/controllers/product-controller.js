const Product = require("../models/Project");

const getProductStats = async(req, res)=>{
    try{

        const result = await Product.aggregate([
            {
                $match: {
                    inStock: true,
                    price: {
                        $gte: 150
                    }
                }
            },
            // stage 2 : group documents
            {
                $group: {
                    _id: "$category",
                    avgPrice: {
                        $avg: "$price"
                    },
                    count: {
                        $sum: 1
                    },
                },
            },

        ]);

        res.status(200).json({
            success: true,
            data: result
        })


    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured"
        })
    }
}

const getProductAnalysis = async(req, res)=>{
    try{
        const result = await Product.aggregate([
            {
                $match: {
                    category: 'Electronic'
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue : {
                        $sum: "$price"
                    },
                    averagePrice : {
                        $avg: "$price"
                    },
                    maxProductPrice: {
                        $max: "$price"
                    },
                    minProductPrice: {
                        $min: "$price"
                    },

                }
            },
            {
                $project: {
                    _id: 0,
                    totalRevenue: 1,
                    averagePrice: 1,
                    maxProductPrice: 1,
                    minProductPrice: 1,
                    priceRange: {
                        $subtract: ["$maxProductPrice", "$minProductPrice"]
                    }


                }
            }

        ])

        res.status(200).json({
            success: true,
            data: result
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured"
        })
    }
}


const insertSampleProducts = async(req, res)=> {
    try{
        const samplePoducts = [
            {
                name: 'Laptop',
                category: 'Electronic',
                price: 999,
                inStock: true,
                tags: ['computer', 'tech']
            },
            {
                name: 'Smartphone',
                category: 'Electronic',
                price: 99,
                inStock: true,
                tags: ['computer', 'tech']
            },
            {
                name: 'Titanic',
                category: 'Movie',
                price: 23,
                inStock: true,
                tags: ['Movie', 'documentary']
            },
            {
                name: 'SmartTV Samsung',
                category: 'Electronic',
                price: 870,
                inStock: true,
                tags: ['computer', 'TV']
            },
            {
                name: 'Running Shoe',
                category: 'Sports',
                price: 870,
                inStock: true,
                tags: ['footwear', 'running']
            }
        ]

        const result = await Product.insertMany(samplePoducts);
        res.status(201).json({
            success: true,
            data: `Inserted ${result.length} sample products`,
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured"
        })
    }
}



module.exports = { insertSampleProducts, getProductStats, getProductAnalysis }