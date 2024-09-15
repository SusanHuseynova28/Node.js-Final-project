const Blog = require('../models/BlogModel');
const path = require('path');
const fs = require('fs');
const multer = require('multer');


const upload = multer({ dest: 'uploads/' });


const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};


const getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};


const createBlog = async (req, res, next) => {
  try {
    console.log(req.body); 
    const { title, description, slug, postedBy } = req.body;
    
    
    let existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return res.status(400).json({
        success: false,
        message: `Slug already exists. Please choose a different slug.`,
      });
    }

    
    const image = req.file ? req.file.filename : null;

    const newBlog = await Blog.create({
      title,
      description,
      slug,
      image,
      postedBy,
    });

    res.status(201).json({
      success: true,
      data: newBlog,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Duplicate slug, please choose a different one.',
      });
    }
    next(error);
  }
};


const updateBlog = async (req, res, next) => {
  try {
    const { title, description, slug, postedBy } = req.body;
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

   
    if (req.file) {
      if (blog.image) {
        const oldImagePath = path.join(__dirname, "../uploads", blog.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); 
        }
      }
      blog.image = req.file.filename;
    }

    
    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.slug = slug || blog.slug;
    blog.postedBy = postedBy || blog.postedBy;
    blog.updatedAt = Date.now();

    await blog.save();

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};


const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    
    if (blog.image) {
      const imagePath = path.join(__dirname, "../uploads", blog.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); 
      }
    }

    await Blog.deleteOne({ _id: req.params.id });

    res.status(200).json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
