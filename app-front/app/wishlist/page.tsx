"use client";
import React, { useState, useEffect } from "react";
import { Collection } from "@/app/types/collection";
import Navbar from "../_featured/header";
import Footer from "../_featured/footer";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<Collection[]>([]);

  // Wishlist-dən məlumatları oxumaq
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Məhsulu wishlist-dən silən funksiya
  const removeFromWishlist = (id: string) => {
    const updatedWishlist = wishlist.filter((item) => item._id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8 mt-10">
        <h2 className="text-center text-4xl mt-6">Wishlist</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div key={item._id} className="relative  p-4 w-[270px] ">
             
              <button
                className="absolute top-2 right-2 cursor-pointer text-xl"
                onClick={() => removeFromWishlist(item._id)}
              >
                ✖
              </button>
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <h3 className="text-sm font-medium uppercase mt-2">{item.description}</h3>
              <p className="text-gray-600">{item.title}</p>
              <p className="text-lg font-bold">${item.price}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
