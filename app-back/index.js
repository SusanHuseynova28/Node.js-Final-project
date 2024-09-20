require("dotenv").config();
const express = require("express");
const cors = require("cors");
const productDbConnection = require("./db/ProductDb"); 
const connection = require("./db/ConnectionDb"); 
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Middleware for parsing JSON requests
app.use(express.json());

// Middleware for handling CORS
app.use(cors());

// Connect to the Product database using the connection from ProductDb.js
productDbConnection();

// Routes for authentication
app.use("/api/auth", authRoutes);

// Routes for product management
app.use("/api/products", productRoutes);


// Define the server port from .env or default to 8080
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server is running on port ${port}...`));
