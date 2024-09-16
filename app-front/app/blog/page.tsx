"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);


  const blogsPerPage = 8;

  const [newBlog, setNewBlog] = useState({
    title: "",
    description: "",
    image: null,
    folder: "default",
    category: "",
    postedBy: "",
    isNew: true,
  });

  useEffect(() => {
    
    setTimeout(() => {
      fetch("http://localhost:3001/api/v1/blogs")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch blogs");
          }
          return response.json();
        })
        .then((data) => {
          if (data && data.data) {
            setBlogs(data.data.map((blog) => ({ ...blog, isNew: false })));
          } else {
            throw new Error("Invalid data structure");
          }
        })
        .catch((error) => console.error("Failed to fetch blogs:", error))
        .finally(() => setLoading(false));
    }, 3000);
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCreateBlog = () => {
    if (!newBlog.title || !newBlog.description) {
      toast.error("Please fill in all fields.");
      return;
    }

    const newBlogEntry = {
      ...newBlog,
      _id: Date.now(),
      image: newBlog.image
        ? URL.createObjectURL(newBlog.image) 
        : "http://localhost:3001/uploads/placeholder.png", 
      isNew: true,
      postDate: new Date().toISOString(),
    };

    
    setBlogs((prevBlogs) => [newBlogEntry, ...prevBlogs]);

    
    setCurrentPage(1);

    toast.success("Blog created successfully!");
    setShowModal(false);

   
    setNewBlog({
      title: "",
      description: "",
      image: null,
      folder: "default",
      category: "",
      postedBy: "",
      isNew: true,
    });
  };

  const handleDeleteBlog = (id) => {
    setBlogs(blogs.filter((blog) => blog._id !== id));
    toast.error("Blog deleted successfully!");
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-5">
      <ToastContainer /> 
      <h1 className="text-4xl font-semibold text-center mt-6">News</h1>
      
      <div className="flex justify-between items-center mt-6 pl-6">
        <input
          type="text"
          placeholder="Search blogs..."
          className="p-2 border border-gray-300 rounded"
          value={searchQuery}
          onChange={handleSearch}
        />
        <button
          className="bg-black text-white px-4 py-2 rounded"
          onClick={() => setShowModal(true)}
        >
          Create Blog
        </button>
      </div>
     
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 p-6">
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 animate-pulse h-64 rounded"
              ></div>
            ))}
        </div>
      ) : (
        <>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 p-6">
            {currentBlogs.map((blog) => (
              <div key={blog._id} className="bg-white overflow-hidden relative">
                <div className="relative group overflow-hidden">
                  <img
                    src={
                      blog.isNew && blog.image
                        ? blog.image
                        : `http://localhost:3001/uploads/${
                            blog.image || "placeholder.png"
                          }`
                    }
                    alt={blog.title}
                    className="w-full h-52 object-cover transform transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="absolute top-3 left-3 bg-black text-white px-2 py-1 text-xs font-bold uppercase">
                    {blog.category || "News"}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-500 mb-2">
                    POST BY{" "}
                    {blog.postedBy
                      ? blog.postedBy.toUpperCase()
                      : "Unknown Author"}{" "}
                    - {new Date(blog.postDate).toDateString()}
                  </p>
                  <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                  <p className="text-gray-600 mb-4">
                    {blog.description.length > 100
                      ? `${blog.description.substring(0, 100)}...`
                      : blog.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <Link href={`/carddetails`}>
                      <button className="text-black underline-animation">
                        Continue Reading
                      </button>
                    </Link>

                    {blog.isNew && (
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteBlog(blog._id)}
                      >
                        <FiTrash size={20} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

         
          <div className="flex justify-center mt-6">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`mx-1 px-3 py-1 border border-b-2 ${
                  currentPage === index + 1 ? " text-black" : "bg-gray-200"
                } rounded`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
      
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-2xl font-bold mb-4">Create New Blog</h2>
            <input
              type="text"
              placeholder="Title"
              value={newBlog.title}
              onChange={(e) =>
                setNewBlog({ ...newBlog, title: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <textarea
              placeholder="Description"
              value={newBlog.description}
              onChange={(e) =>
                setNewBlog({ ...newBlog, description: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setNewBlog({ ...newBlog, image: e.target.files[0] })
              }
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <input
              type="text"
              placeholder="Category"
              value={newBlog.category}
              onChange={(e) =>
                setNewBlog({ ...newBlog, category: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
              type="text"
              placeholder="Posted By"
              value={newBlog.postedBy}
              onChange={(e) =>
                setNewBlog({ ...newBlog, postedBy: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <button
              className="bg-black text-white px-4 py-2 rounded mr-2"
              onClick={handleCreateBlog}
            >
              Save Blog
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
