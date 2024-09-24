"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Navbar from "@/app/_featured/header";
import Footer from "@/app/_featured/footer";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  hoverImageUrl: string;
}

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/collections/${id}`
        );
        const data: Product = await response.json();
        setProduct(data);
        setSelectedImage(data.imageUrl);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto py-8 flex flex-col lg:flex-row space-x-0 lg:space-x-8 mt-10 p-14">
        <div className="flex flex-col w-full lg:w-1/2 space-y-4 lg:space-y-0 lg:space-x-4 lg:flex-row">
          <div className="flex flex-col space-y-4 lg:space-y-4 w-20 lg:w-1/5">
            <Skeleton width={80} height={80} />
            <Skeleton width={80} height={80} />
          </div>
          <div className="w-full lg:w-4/5">
            <Skeleton width="100%" height={400} />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <Skeleton height={40} width="60%" />
          <Skeleton height={20} width="40%" className="mt-2" />
          <Skeleton height={30} width="30%" className="mt-4" />
          <Skeleton height={20} width="100%" className="mt-4" />
          <Skeleton height={20} width="50%" className="mt-2" />
          <Skeleton height={30} width="80%" className="mt-6" />
          <Skeleton height={20} width="100%" className="mt-4" />
          <Skeleton height={40} width="100%" className="mt-6" />
        </div>
      </div>
    );
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8 flex flex-col lg:flex-row space-x-0 lg:space-x-8 mt-10 p-14">
        <div className="flex flex-col w-full lg:w-1/2 space-y-4 lg:space-y-0 lg:space-x-4 lg:flex-row">
          <div className="flex flex-col space-y-4 lg:space-y-4 w-20 lg:w-1/5">
            <img
              src={product.imageUrl}
              className={`w-20 h-20 object-cover border ${
                selectedImage === product.imageUrl
                  ? "border-black"
                  : "border-gray-200"
              }`}
              alt="thumbnail"
              onClick={() => setSelectedImage(product.imageUrl)}
            />
            <img
              src={product.hoverImageUrl}
              className={`w-20 h-20 object-cover border ${
                selectedImage === product.hoverImageUrl
                  ? "border-black"
                  : "border-gray-200"
              }`}
              alt="thumbnail"
              onClick={() => setSelectedImage(product.hoverImageUrl)}
            />
          </div>
          <div className="w-full lg:w-4/5">
            <img
              src={selectedImage}
              alt={product.title}
              className="object-cover w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl font-bold">{product.title}</h2>
          <p className="text-lg mt-2 text-gray-500">
            3 reviews |{" "}
            <span className="text-red-500">17 sold in last 16 hours</span>
          </p>
          <p className="text-2xl font-semibold mt-4">${product.price}</p>
          <p className="mt-4">{product.description}</p>
          <p className="text-sm text-gray-500 mt-4">
            18 people are viewing this right now
          </p>
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Add your personalization</h3>
            <p className="text-sm text-gray-500 mb-2">
              Add your name, note or upload your customized idea image to
              personalize your item. Custom items cannot be returned or
              exchanged.
            </p>
            <input
              type="text"
              placeholder="Customize note"
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            />
            <div className="flex items-center space-x-4">
              <button className="border border-gray-300 rounded-lg py-2 px-4">
                No file chosen
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 rounded-lg py-2 px-4">
                Upload image
              </button>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-red-500 font-semibold">
              Hurry Up! Only <span>10</span> left in stock!
            </p>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Purchase Options</h3>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                name="purchase-option"
                defaultChecked
                className="mr-2"
              />
              <label>One Time Purchase - ${product.price}</label>
            </div>
            <div className="flex items-center">
              <input type="radio" name="purchase-option" className="mr-2" />
              <label>Subscribe and save - ${product.price}</label>
            </div>
          </div>
          <div className="mt-6 flex items-center space-x-4">
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button className="px-4 py-2">-</button>
              <input
                type="text"
                value="1"
                className="w-12 text-center border-none"
              />
              <button className="px-4 py-2">+</button>
            </div>
            <button className="bg-black text-white py-2 px-6 rounded-lg hover:bg-gray-800">
              ADD TO CART
            </button>
          </div>
          <div className="mt-4">
            <input type="checkbox" className="mr-2" />
            <label className="text-sm">
              I agree with <span className="underline">Terms & Conditions</span>
            </label>
          </div>
          <button className="mt-4 bg-gray-100 text-gray-600 py-2 px-6 rounded-lg hover:bg-gray-200 w-full">
            BUY IT NOW
          </button>
          <div className="mt-6">
            <p className="text-sm text-gray-500">
              Pickup available at{" "}
              <span className="underline">Shop location</span>. Usually ready in
              24 hours
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
