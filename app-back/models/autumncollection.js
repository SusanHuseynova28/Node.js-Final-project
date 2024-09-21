const mongoose = require('mongoose');

const AutumnCollectionSchema = new mongoose.Schema({
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
    imageUrl: { // Normal şəkil
        type: String,
        required: true
    },
    hoverImageUrl: { // Hover şəkili
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
    },
    originalPrice: {
        type: Number, // Burada [number] deyil, sadəcə Number olmalıdır
        required: true
    },
    discount: {
        type: Number, // Burada da [number] deyil, sadəcə Number olmalıdır
        required: true
    }
});

module.exports = mongoose.model('AutumnCollection', AutumnCollectionSchema);
