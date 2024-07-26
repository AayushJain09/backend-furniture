const Product = require('../models/Products');

module.exports = {
    // Create a new product
    createProduct: async (req, res) => {
        const newProduct = new Product(req.body);

        try {
            await newProduct.save();
            res.status(200).json("product created successfully");
        } catch (err) {
            res.status(500).json("failed to create because " + err);
        }
    },

    // Get all products
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find().sort({ createdAt: -1 });
            res.status(200).json(products);
        } catch (err) {
            res.status(500).json("failed to get products because " + err);
        }
    },

    // Get a single product
    getSingleProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            res.status(200).json(product);
        } catch (err) {
            res.status(500).json("failed to get product because " + err);
        }
    },

    // Search products
    searchProduct: async (req, res) => {
        try {
            const results = await Product.aggregate([
                {
                    $search: {
                        index: "furniture",
                        text: {
                            query: req.params.key,
                            path: {
                                wildcard: "*"
                            }
                        }
                    }
                }
            ]);
            res.status(200).json(results);
        } catch (err) {
            res.status(500).json("failed to get products because " + err);
        }
    },
};
