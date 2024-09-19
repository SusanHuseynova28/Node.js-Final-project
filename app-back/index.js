require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require("./db/ConnectionDb");
const authRoutes = require("./routes/auth");

const app = express();

app.use(express.json());
app.use(cors());

connection();  


app.use("/api/auth", authRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server is running on port ${port}...`));
