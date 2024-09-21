require("dotenv").config();
const express = require("express");
const cors = require("cors");
const productDbConnection = require("./db/ProductDb"); 
const connection = require("./db/ConnectionDb"); 
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const collectionRoutes = require("./routes/collectionRoutes");

const app = express();

app.use(express.json());
app.use(cors());

productDbConnection(); 
connection();


app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);


app.use("/api/collections", collectionRoutes); 

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server is running on port ${port}...`));
