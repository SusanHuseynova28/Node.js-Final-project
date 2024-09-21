"use client"
import React, { useState, useEffect } from "react";
import { Collection } from "@/app/types/collection"; // Dataların tipini daxil edirik
import Navbar from "../_featured/header";
import Footer from "../_featured/footer";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<Collection[]>([]);

  useEffect(() => {
    // localStorage-dan wishlist məlumatını gətiririk
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  return (
    <>
    <Navbar/>
    <div className="container mx-auto py-8">
      <h2 className="text-center text-4xl mt-6"> Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <div key={item._id} className="relative border p-4">
            <span className="absolute top-2 right-2 cursor-pointer text-xl">✖</span>
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
    <Footer/>
    </>
  );
}
