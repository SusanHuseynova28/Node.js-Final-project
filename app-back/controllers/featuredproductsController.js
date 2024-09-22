
const FeaturedProduct = require('../models/featuredproducts');


exports.getAllFeaturedProducts = async (req, res) => {
    try {
        const products = await FeaturedProduct.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching featured products' });
    }
};


exports.getFeaturedProductById = async (req, res) => {
    try {
        const product = await FeaturedProduct.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching the product' });
    }
};


exports.createFeaturedProduct = async (req, res) => {
    try {
        const newProduct = new FeaturedProduct(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product' });
    }
};


exports.updateFeaturedProduct = async (req, res) => {
    try {
        const updatedProduct = await FeaturedProduct.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product' });
    }
};


exports.deleteFeaturedProduct = async (req, res) => {
    try {
        const deletedProduct = await FeaturedProduct.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product' });
    }
};
