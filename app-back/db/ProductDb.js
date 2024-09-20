const mongoose = require('mongoose');

// Function to connect to MongoDB using the DATABASE_URL from .env
const connectProductDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('MongoDB connected successfully to product database');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectProductDB;
