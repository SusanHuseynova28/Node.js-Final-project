"use client";
import React, { useEffect, useState } from "react";
import { Category } from "@/app/types/category";

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/categories");

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const data: Category[] = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to load categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl mb-4 text-center">Popular Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 p-6">
        {categories.map((category) => (
          <div key={category.name} className="category-card text-center p-4">
            <div className="w-full  rounded-full overflow-hidden">
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-110"
              />
            </div>

            <div className="mt-2">
              <a href="#" className="relative text-black font-semibold group">
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <span className="block h-[2px] w-0 bg-black transition-all duration-500 group-hover:w-full"></span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
