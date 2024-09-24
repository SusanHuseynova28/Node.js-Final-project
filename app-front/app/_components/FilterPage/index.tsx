import React, { useEffect, useState } from "react";
import { ProductCollection } from "@/app/types/ProductCollection";

export default function FilterPage() {
  const [collections, setCollections] = useState<ProductCollection[]>([]);
  const [filteredCollections, setFilteredCollections] = useState<
    ProductCollection[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const collectionsPerPage = 9;
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const [filters, setFilters] = useState({
    price: [0, 1000],
    material: "",
    color: "",
    size: "",
    availability: "",
  });

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/collections");
        const data = await response.json();

        setCollections(data);
        setFilteredCollections(data);

        const prices = data.map((item: ProductCollection) => item.price);
        setMinPrice(Math.min(...prices));
        setMaxPrice(Math.max(...prices));
        setFilters((prevFilters) => ({
          ...prevFilters,
          price: [Math.min(...prices), Math.max(...prices)],
        }));
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };
    fetchCollections();
  }, []);

  useEffect(() => {
    let filtered = collections;

    filtered = filtered.filter(
      (item) => item.price >= filters.price[0] && item.price <= filters.price[1]
    );

    if (filters.material) {
      filtered = filtered.filter((item) => item.material === filters.material);
    }

    if (filters.color) {
      filtered = filtered.filter((item) => item.color === filters.color);
    }

    if (filters.size) {
      filtered = filtered.filter((item) => item.size.includes(filters.size));
    }

    if (filters.availability) {
      filtered = filtered.filter((item) =>
        filters.availability === "in stock" ? item.inStock : !item.inStock
      );
    }

    setFilteredCollections(filtered);
  }, [filters, collections]);

  const indexOfLastCollection = currentPage * collectionsPerPage;
  const indexOfFirstCollection = indexOfLastCollection - collectionsPerPage;
  const currentCollections = filteredCollections.slice(
    indexOfFirstCollection,
    indexOfLastCollection
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredCollections.length / collectionsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const handleFilterChange = (type: string, value: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: value,
    }));
  };

  return (
    <div className="flex mt-8">
      <div className="w-1/4 p-4">
        <h3 className="text-lg font-semibold mb-4">Filters</h3>

        <div className="mb-6">
          <h4 className="text-md font-semibold mb-2">Collections</h4>
          <ul className="ml-4 space-y-2 text-sm">
            <li>
              <input type="checkbox" /> All collections
            </li>
            <li>
              <input type="checkbox" /> Art by Savila
            </li>
            <li>
              <input type="checkbox" /> Middle of North
            </li>
            <li>
              <input type="checkbox" /> Media
            </li>
            <li>
              <input type="checkbox" /> Original
            </li>
            <li>
              <input type="checkbox" /> Royal Love
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h4 className="text-md font-semibold mb-2">Price</h4>
          <div className="relative flex items-center">
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={filters.price[1]}
              onChange={(e) =>
                handleFilterChange("price", [minPrice, +e.target.value])
              }
              className="w-full"
            />
          </div>
          <p className="text-gray-600 text-sm mt-2">
            Price: ${filters.price[0]} - ${filters.price[1]}
          </p>
        </div>

        <div className="mb-6">
          <h4 className="text-md font-semibold mb-2">Material</h4>
          <ul className="ml-4 space-y-2 text-sm">
            <li>
              <input
                type="checkbox"
                onClick={() => handleFilterChange("material", "bronze")}
              />{" "}
              Bronze
            </li>
            <li>
              <input
                type="checkbox"
                onClick={() => handleFilterChange("material", "gold")}
              />{" "}
              Gold
            </li>
            <li>
              <input
                type="checkbox"
                onClick={() => handleFilterChange("material", "silver")}
              />{" "}
              Silver
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h4 className="text-md font-semibold mb-2">Color</h4>
          <div className="flex space-x-2 mt-2">
            <div
              className="w-6 h-6 bg-black rounded-full cursor-pointer"
              onClick={() => handleFilterChange("color", "black")}
            />
            <div
              className="w-6 h-6 bg-red-500 rounded-full cursor-pointer"
              onClick={() => handleFilterChange("color", "red")}
            />
            <div
              className="w-6 h-6 bg-blue-500 rounded-full cursor-pointer"
              onClick={() => handleFilterChange("color", "blue")}
            />
            <div
              className="w-6 h-6 bg-yellow-500 rounded-full cursor-pointer"
              onClick={() => handleFilterChange("color", "yellow")}
            />
            <div
              className="w-6 h-6 bg-gray-400 rounded-full cursor-pointer"
              onClick={() => handleFilterChange("color", "gray")}
            />
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-md font-semibold mb-2">Size</h4>
          <div className="flex space-x-2 mt-2">
            <button
              className="px-2 py-1 border text-sm"
              onClick={() => handleFilterChange("size", "S")}
            >
              S
            </button>
            <button
              className="px-2 py-1 border text-sm"
              onClick={() => handleFilterChange("size", "M")}
            >
              M
            </button>
            <button
              className="px-2 py-1 border text-sm"
              onClick={() => handleFilterChange("size", "L")}
            >
              L
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-md font-semibold mb-2">Availability</h4>
          <ul className="ml-4 space-y-2 text-sm">
            <li>
              <input
                type="checkbox"
                onClick={() => handleFilterChange("availability", "in stock")}
              />{" "}
              In Stock
            </li>
            <li>
              <input
                type="checkbox"
                onClick={() =>
                  handleFilterChange("availability", "out of stock")
                }
              />{" "}
              Out of Stock
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h4 className="text-md font-semibold mb-2">Tags</h4>
          <ul className="ml-4 space-y-2 text-sm">
            <li>
              <input type="checkbox" /> Bags
            </li>
            <li>
              <input type="checkbox" /> Black
            </li>
            <li>
              <input type="checkbox" /> Blue
            </li>
            <li>
              <input type="checkbox" /> Brand
            </li>
            <li>
              <input type="checkbox" /> Fashion
            </li>
          </ul>
        </div>
      </div>

      <div className="w-3/4 p-4">
        <div className="grid grid-cols-3 gap-6">
          {currentCollections.length > 0 ? (
            currentCollections.map((collection) => (
              <div
                key={collection._id}
                className=" p-4   transition-all relative"
              >
                <img
                  src={collection.imageUrl}
                  alt={collection.title}
                  className="w-full h-64 object-cover mb-2"
                />
                <h3 className="text-md font-semibold">{collection.title}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  ${collection.price}
                </p>
                {collection.onSale && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs font-bold">
                    Sale
                  </span>
                )}
                {collection.new && (
                  <span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 text-xs font-bold">
                    New
                  </span>
                )}
                <button className="bg-black text-white mt-2 px-4 py-1 text-sm">
                  Add to Cart
                </button>
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
