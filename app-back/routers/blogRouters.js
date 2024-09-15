const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const { v4: uuidv4 } = require('uuid');
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/BlogController");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/; 
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only images are allowed (jpeg, jpg, png)!"));
    }
  },
});



const downloadImage = async (imageUrl, filename) => {
 
  const cleanFilename = filename.split('?')[0];

  const writer = fs.createWriteStream(path.join(__dirname, '../uploads', cleanFilename));

  const response = await axios({
    url: imageUrl,
    method: 'GET',
    responseType: 'stream',
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
};



const handleImageUploadOrUrl = async (req, res, next) => {
  try {
    if (!req.file && req.body.imageUrl) {
      
      const imageUrl = req.body.imageUrl;
      const filename = `${uuidv4()}-${path.basename(imageUrl)}`;

      
      await downloadImage(imageUrl, filename);

    
      req.file = { filename };
    }
    next();
  } catch (error) {
    next(error);
  }
};


router.get("/", getAllBlogs);

router.get("/:id", getBlogById);


router.post("/", upload.single("image"), handleImageUploadOrUrl, createBlog);

router.put("/:id", upload.single("image"), handleImageUploadOrUrl, updateBlog);


router.delete("/:id", deleteBlog);

module.exports = router;
