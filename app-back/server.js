const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const connectDB = require("./db/ConnectionDb");
const blogRouter = require("./routers/blogRouters");
const { ErrorMiddleware } = require("./utils/ErrorHandlers");

const app = express();


app.use(express.json());
app.use(cors());


const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


app.use("/uploads", express.static(path.join(__dirname, "uploads")));


connectDB();


app.use("/api/v1/blogs", blogRouter);


app.use(ErrorMiddleware);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
