const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name for the product'],
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  imageUrl: {
    type: String,
    required: [true, 'Please add an image URL'],
  },
  link: {
    type: String,
    required: [true, 'Please add a link to the product'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', ProductSchema);
