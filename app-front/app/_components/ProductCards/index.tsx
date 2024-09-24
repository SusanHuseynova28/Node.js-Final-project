"use client";
import React, { useEffect, useState } from "react";
import { Product } from "@/app/types/product";

export default function ProductCards() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("http://localhost:3001/api/products");
      const data = await res.json();
      console.log(data);
      setProducts(data.data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto py-8 flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative w-[450px] h-[300px] overflow-hidden m-2 group"
          >
            <div className="overflow-hidden w-full h-full">
              <img
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-110"
                src={product.imageUrl}
                alt={product.name}
              />
            </div>

            <div className="absolute inset-0 flex flex-col justify-center items-start p-6 mb-10">
              <p className="text-white text-sm">{product.category}</p>
              <h2 className="text-white font-bold text-2xl mb-2 w-[10rem] mt-2">
                {product.name}
              </h2>
              <a
                href={product.link}
                className="relative mt-2 text-white text-lg after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-500 hover:after:w-full"
              >
                SHOP NOW
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
