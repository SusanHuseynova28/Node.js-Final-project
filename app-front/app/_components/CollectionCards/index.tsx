"use client"
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FaHeart, FaSyncAlt, FaSearch } from "react-icons/fa";
import { Collection } from "@/app/types/collection";

export default function CollectionGrid({ addToHeader }: { addToHeader: (item: Collection) => void; }) {
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/collections");
        const data: Collection[] = await response.json();
        setCollections(data.slice(0, 7)); // 7 məhsul çəkirik
      } catch (error) {
        console.error("Kolleksiyaları yükləyərkən xəta baş verdi:", error);
      }
    };

    fetchCollections();
  }, []);
  const handlePriceHover = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const priceElement = e.currentTarget;
    const addToCartElement = priceElement.nextElementSibling;
    if (priceElement && addToCartElement) {
      priceElement.classList.toggle("hidden");
      addToCartElement.classList.toggle("hidden");
    }
  };

  // Wishlist-ə məhsul əlavə edən funksiya
  const addToWishlist = (item: Collection) => {
    const existingWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const updatedWishlist = [...existingWishlist, item];
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    alert(`${item.title} wishlist-ə əlavə olundu `);
  };

  return (
    <div className="container mx-auto py-8 relative">
      <h2 className="text-center text-3xl  mb-4">Trendy Collection</h2>
      <p className="text-center mb-8">Collect your loves with our newest arrivals.</p>

      {/* Swiper göstərir */}
      <Swiper
        spaceBetween={20}
        slidesPerView={4} 
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        className="relative group p-4 max-w-6xl mx-auto"
      >
        {collections.slice(0, 7).map((collection) => (
          <SwiperSlide key={collection._id}>
            <div className="relative overflow-hidden transition-transform duration-300">
              <img
                src={collection.imageUrl}
                alt={collection.title}
                className="object-cover w-full h-[280px] transition-opacity duration-300 hover:opacity-80"
              />
              <img
                src={collection.hoverImageUrl}
                alt={`${collection.title} Hover`}
                className="absolute inset-0 object-cover w-full h-[280px] opacity-0 transition-opacity duration-300 hover:opacity-100"
              />
              <div className="absolute right-4 top-4 flex flex-col space-y-2 opacity-0 transition-all duration-300 transform translate-x-full group-hover:translate-x-0 group-hover:opacity-100">
                <button className="p-2  rounded-full shadow-lg bg-black text-white transition" onClick={() => addToWishlist(collection)}>
                  <FaHeart className="text-white hover:text-black " />
                </button>
                <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-200 transition">
                  <FaSyncAlt className="text-black hover:text-white" />
                </button>
                <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-200 transition">
                  <FaSearch className="text-black hover:text-white" />
                </button>
              </div>
              <div className="mt-4 text-center relative">
                <h3 className="text-xs  uppercase">{collection.description}</h3>
                <p className="text-gray-600 mt-2">{collection.title}</p>
                <div className="relative mt-2">
                  <span
                    className="text-sm cursor-pointer "
                    onMouseEnter={handlePriceHover}
                    onMouseLeave={handlePriceHover}
                  >
                    ${collection.price}
                  </span>
                  <p className="hidden text-sm font-semibold text-black cursor-pointer transition-opacity underline">
                    ADD TO CART
                  </p>
                </div>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}