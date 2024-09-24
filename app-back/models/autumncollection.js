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
    imageUrl: { 
        type: String,
        required: true
    },
    hoverImageUrl: { 
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
        type: Number, 
        required: true
    },
    discount: {
        type: Number, 
        required: true
    },
   
  
});

module.exports = mongoose.model('AutumnCollection', AutumnCollectionSchema);
