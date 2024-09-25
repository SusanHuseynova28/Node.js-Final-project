const Collection = require('../models/Collection');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage });


exports.getAllCollections = async (req, res) => {
    try {
        const collections = await Collection.find();
        res.status(200).json(collections);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching collection cards', error: error.message });
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
        res.status(500).json({ message: 'Error fetching collection card', error: error.message });
    }
};


exports.createCollection = async (req, res) => {
  
    upload.single('image')(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
           
            return res.status(400).json({ message: 'File upload error', error: err.message });
        } else if (err) {
       
            return res.status(500).json({ message: 'Unknown error during file upload', error: err.message });
        }

        try {
            const { title, price, description } = req.body;

         
            if (!title || !price || !description) {
                return res.status(400).json({ message: 'Title, price, and description are required' });
            }

          
            const newCollection = new Collection({
                title,
                price,
                description,
                imageUrl: req.file ? `/uploads/${req.file.filename}` : '',
            });

            
            const savedCollection = await newCollection.save();
            res.status(201).json(savedCollection); 

        } catch (error) {
            res.status(500).json({ message: 'Error creating collection', error: error.message });
        }
    });
};

exports.updateCollection = async (req, res) => {
    upload.single('image')(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: 'Multer error during file upload', error: err.message });
        } else if (err) {
            return res.status(500).json({ message: 'Unknown error during file upload', error: err.message });
        }

        try {
            const { title, price, description } = req.body;
            const updatedData = { title, price, description };

            if (req.file) {
                updatedData.imageUrl = `/uploads/${req.file.filename}`; 
            }

            const updatedCollection = await Collection.findByIdAndUpdate(req.params.id, updatedData, { new: true });
            if (!updatedCollection) {
                return res.status(404).json({ message: 'Collection not found' });
            }

            res.status(200).json(updatedCollection);
        } catch (error) {
            res.status(500).json({ message: 'Error updating collection card', error: error.message });
        }
    });
};


exports.deleteCollection = async (req, res) => {
    try {
        const deletedCollection = await Collection.findByIdAndDelete(req.params.id);
        if (!deletedCollection) {
            return res.status(404).json({ message: 'Collection not found' });
        }
        res.status(200).json({ message: 'Collection deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting collection card', error: error.message });
    }
};
