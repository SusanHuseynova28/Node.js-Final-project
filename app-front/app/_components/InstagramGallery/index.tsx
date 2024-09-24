"use client";
import { IoLogoInstagram } from "react-icons/io5";

export default function InstagramGallery() {
  const images = [
    "https://demo-alukas.myshopify.com/cdn/shop/files/alk_i1.jpg?v=1711684513",
    "https://demo-alukas.myshopify.com/cdn/shop/files/alk_i2.jpg?v=1711684491",
    "https://demo-alukas.myshopify.com/cdn/shop/files/alk_i3.jpg?v=1711684606",
    "https://demo-alukas.myshopify.com/cdn/shop/files/alk_i4.jpg?v=1711684578",
    "https://demo-alukas.myshopify.com/cdn/shop/files/alk_i5.jpg?v=1712894690",
    "https://demo-alukas.myshopify.com/cdn/shop/files/alk_i6.jpg?v=1711684593",
  ];

  return (
    <div className="py-8 mt-16 flex flex-col justify-center">
      <h2 className="text-center text-4xl font-semibold">
        Follow Us on Instagram
      </h2>
      <p className="text-center text-gray-500 mb-8 mt-2">@bersky</p>

      <div className="flex justify-center gap-4 flex-nowrap p-10 overflow-x-auto">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative group w-[270px] h-[200px] object-cover overflow-hidden"
          >
            <img
              src={image}
              alt={`Instagram post ${index}`}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
            />

            <div className="absolute inset-0 flex justify-center items-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                <div className="w-12 h-12 bg-white rounded-full flex justify-center items-center shadow-lg cursor-pointer">
                  <IoLogoInstagram className="text-2xl text-gray-900" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
