const mongoose = require('mongoose');

const CollectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: { // Normal image
        type: String,
        required: true
    },
    hoverImageUrl: { // Hover image
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Collection', CollectionSchema);
