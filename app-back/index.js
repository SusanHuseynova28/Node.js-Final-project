require("dotenv").config();
const express = require("express");
const cors = require("cors");
const productDbConnection = require("./db/ProductDb"); 
const connection = require("./db/ConnectionDb"); 
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const collectionRoutes = require("./routes/collectionRoutes"); // Collection routes

const app = express();

app.use(express.json());
app.use(cors());

productDbConnection(); // Existing product DB connection
connection(); // Additional DB connection if needed for collections (ensure this is used properly)

// Existing routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

// Collection routes
app.use("/api/collections", collectionRoutes); // Added the collection routes

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server is running on port ${port}...`));
