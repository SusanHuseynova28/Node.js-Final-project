const Collection = require('../models/Collection');


exports.getAllCollections = async (req, res) => {
    try {
        const collections = await Collection.find();
        res.status(200).json(collections);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching collection cards' });
    }
};

exports.getCollectionById = async (req, res) => {
    try {
        const collection = await Collection.findById(req.params.id);
        if (!collection) {
            return res.status(404).json({ message: 'Collection not found' });
        }
        res.status(200).json(collection);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching collection card' });
    }
};


exports.createCollection = async (req, res) => {
    try {
        const newCollection = new Collection(req.body);
        const savedCollection = await newCollection.save();
        res.status(201).json(savedCollection);
    } catch (error) {
        res.status(500).json({ message: 'Error creating collection card' });
    }
};


exports.updateCollection = async (req, res) => {
    try {
        const updatedCollection = await Collection.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCollection) {
            return res.status(404).json({ message: 'Collection not found' });
        }
        res.status(200).json(updatedCollection);
    } catch (error) {
        res.status(500).json({ message: 'Error updating collection card' });
    }
};


exports.deleteCollection = async (req, res) => {
    try {
        const deletedCollection = await Collection.findByIdAndDelete(req.params.id);
        if (!deletedCollection) {
            return res.status(404).json({ message: 'Collection not found' });
        }
        res.status(200).json({ message: 'Collection deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting collection card' });
    }
};
