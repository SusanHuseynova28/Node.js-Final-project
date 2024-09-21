const Category = require('../models/Category');


exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: "Error fetching categories" });
    }
};


exports.createCategory = async (req, res) => {
    try {
        const { name, imageUrl } = req.body;

        if (!name || !imageUrl) {
            return res.status(400).json({ message: "Name and imageUrl are required" });
        }

        const category = new Category({
            name,
            imageUrl,  
        });

        
        await category.save();

      
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: "Error creating category", error });
    }
};
