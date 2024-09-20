const Category = require('../models/Category');

// Fetch all categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: "Error fetching categories" });
    }
};

// Create a new category with image URL
exports.createCategory = async (req, res) => {
    try {
        const { name, imageUrl } = req.body;

        // Check if name and imageUrl are provided
        if (!name || !imageUrl) {
            return res.status(400).json({ message: "Name and imageUrl are required" });
        }

        // Create a new category instance
        const category = new Category({
            name,
            imageUrl,  // Store the URL as provided in the request body
        });

        // Save the category to the database
        await category.save();

        // Return the newly created category
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: "Error creating category", error });
    }
};
