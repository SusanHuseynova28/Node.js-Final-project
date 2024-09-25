"use client";
import React, { useEffect, useState } from "react";
import { FaHeart, FaSyncAlt, FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Collection } from "@/app/types/collection";

export default function FilterPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [filteredCollections, setFilteredCollections] = useState<Collection[]>(
    []
  );
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1570);
  const [filters, setFilters] = useState({
    price: [0, 1570],
    material: "",
    color: "",
    size: "",
    availability: "",
  });

  const router = useRouter();

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/collections");
        const data = await response.json();

        setCollections(data);
        setFilteredCollections(data);

        const prices = data.map((item: Collection) => item.price);
        setMinPrice(Math.min(...prices));
        setMaxPrice(Math.max(...prices));
        setFilters((prevFilters) => ({
          ...prevFilters,
          price: [Math.min(...prices), Math.max(...prices)],
        }));
      } catch (error) {
        console.error("Kolleksiyaları yükləyərkən xəta baş verdi:", error);
      }
    };
    fetchCollections();
  }, []);

  useEffect(() => {
    let filtered = collections;

    filtered = filtered.filter(
      (item) => item.price >= filters.price[0] && item.price <= filters.price[1]
    );

    setFilteredCollections(filtered);
  }, [filters, collections]);

  const handlePriceChange = (value: number) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      price: [minPrice, value],
    }));
  };

  const handleAddToCart = (item: Collection) => {};

  const handleCardClick = (id: string) => {
    router.push(`/dynamic/${id}`);
  };

  return (
    <div className="flex mt-8">
      <div className="w-1/4 p-4  mt-10 pl-10">
        <h3 className="text-lg font-semibold mb-4">Filters</h3>

        <div className="mb-6">
          <h4 className="text-md font-semibold mb-2 flex justify-between items-center">
            Collections
            <span className="text-gray-500">&#x25BC;</span>
          </h4>
          <ul className="ml-4 space-y-2 text-sm text-gray-800">
            <li>
              <input type="checkbox" className="mr-2" /> All collections
            </li>
            <li>
              <input type="checkbox" className="mr-2" /> Art by Saviola
            </li>
            <li>
              <input type="checkbox" className="mr-2" /> Middle of North
            </li>
            <li>
              <input type="checkbox" className="mr-2" /> Morden
            </li>
            <li>
              <input type="checkbox" className="mr-2" /> Original
            </li>
            <li>
              <input type="checkbox" className="mr-2" /> Royal Love
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h4 className="text-md font-semibold mb-2 flex justify-between items-center">
            Price
            <span className="text-gray-500">&#x25BC;</span>
          </h4>
          <div className="relative flex items-center">
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={filters.price[1]}
              onChange={(e) => handlePriceChange(+e.target.value)}
              className="w-full accent-black"
            />
          </div>
          <p className="text-gray-600 text-sm mt-2">
            Price: ${filters.price[0]} - ${filters.price[1]}
          </p>
        </div>

        <div className="mb-6">
          <h4 className="text-md font-semibold mb-2 flex justify-between items-center">
            Material
            <span className="text-gray-500">&#x25BC;</span>
          </h4>
          <ul className="ml-4 space-y-2 text-sm text-gray-800">
            <li>
              <input type="checkbox" className="mr-2" /> Bronze (2)
            </li>
            <li>
              <input type="checkbox" className="mr-2" /> Gold (3)
            </li>
            <li>
              <input type="checkbox" className="mr-2" /> Silver (3)
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h4 className="text-md font-semibold mb-2 flex justify-between items-center">
            Color
            <span className="text-gray-500">&#x25BC;</span>
          </h4>
          <div className="flex space-x-2 mt-2">
            <div className="w-6 h-6 bg-black rounded-full border cursor-pointer"></div>
            <div className="w-6 h-6 bg-blue-500 rounded-full border cursor-pointer"></div>
            <div className="w-6 h-6 bg-yellow-500 rounded-full border cursor-pointer"></div>
            <div className="w-6 h-6 bg-red-500 rounded-full border cursor-pointer"></div>
            <div className="w-6 h-6 bg-gray-400 rounded-full border cursor-pointer"></div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-md font-semibold mb-2 flex justify-between items-center">
            Size
            <span className="text-gray-500">&#x25BC;</span>
          </h4>
          <div className="flex space-x-2 mt-2">
            <button className="px-2 py-1 border text-sm">S</button>
            <button className="px-2 py-1 border text-sm">M</button>
            <button className="px-2 py-1 border text-sm">L</button>
            <button className="px-2 py-1 border text-sm">12</button>
            <button className="px-2 py-1 border text-sm">14</button>
            <button className="px-2 py-1 border text-sm">16</button>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-md font-semibold mb-2 flex justify-between items-center">
            Availability
            <span className="text-gray-500">&#x25BC;</span>
          </h4>
          <ul className="ml-4 space-y-2 text-sm text-gray-800">
            <li>
              <input type="checkbox" className="mr-2" /> In Stock (45)
            </li>
            <li>
              <input type="checkbox" className="mr-2" /> Out of Stock (6)
            </li>
          </ul>
        </div>
      </div>

      <div className="w-3/4 p-16">
        <div className="grid grid-cols-3 gap-6">
          {filteredCollections.length > 0 ? (
            filteredCollections.map((collection) => (
              <div
                key={collection._id}
                className="relative group overflow-hidden transition-transform duration-300"
                onClick={() => handleCardClick(collection._id)}
              >
                <img
                  src={collection.imageUrl}
                  alt={collection.title}
                  className="object-cover w-full h-[320px] transition-opacity duration-300 hover:opacity-80"
                />
                <img
                  src={collection.hoverImageUrl}
                  alt={`${collection.title} Hover`}
                  className="absolute inset-0 object-cover w-full h-[320px] opacity-0 transition-opacity duration-300 hover:opacity-100"
                />
                <div className="absolute right-4 top-4 flex flex-col space-y-2 opacity-0 transition-all duration-300 transform translate-x-full group-hover:translate-x-0 group-hover:opacity-100">
                  <button className="p-2 rounded-full shadow-lg bg-white text-black">
                    <FaHeart />
                  </button>
                  <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-200">
                    <FaSyncAlt />
                  </button>
                  <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-200">
                    <FaSearch />
                  </button>
                </div>
                <div className="mt-4 text-center relative">
                  <h3 className="text-xs uppercase">
                    {collection.description}
                  </h3>
                  <p className="text-gray-600 mt-2">{collection.title}</p>
                  <div className="relative mt-2">
                    <span
                      className="text-sm cursor-pointer"
                      onMouseEnter={() => {}}
                      onMouseLeave={() => {}}
                    >
                      ${collection.price}
                    </span>
                    <p
                      className="hidden text-sm font-semibold text-black cursor-pointer transition-opacity underline"
                      onClick={() => handleAddToCart(collection)}
                    >
                      ADD TO CART
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
