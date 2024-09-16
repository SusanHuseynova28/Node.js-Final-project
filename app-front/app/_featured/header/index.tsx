"use client";

import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiUser, FiShoppingCart, FiHeart, FiChevronDown } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import CartSidebar from '@/app/sidebar/CardSidebar';

const Header = () => {
  const [user, setUser] = useState(null);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const searchInputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user') || '{}');
    if (data && data.email) {
      setUser(data);
    }
  }, []);

  const handleCloseSearch = () => {
    setShowSearchOverlay(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="bg-black text-white text-sm flex justify-between items-center px-8 py-2">
        <div className="flex space-x-6">
          <div className="flex items-center">
            <span>English</span>
            <FiChevronDown className="ml-1 text-gray-500" />
          </div>
          <div className="flex items-center">
            <span>United States (USD $)</span>
            <FiChevronDown className="ml-1 text-gray-500" />
          </div>
          <a href="#">
            Summer Sale 15% off!
          </a>
          <a href="#" className="underline">
            Shop Now!
          </a>
        </div>
        <div className="flex space-x-6">
          <a href="#">Store Location</a>
          <a href="#">Contact</a>
          <a href="#">About</a>
          <a href="#">Gift Cards</a>
        </div>
      </div>

      <div className="flex justify-between items-center py-4 px-8 bg-white border-b">
        <div className="flex items-center border h-[3rem] border-gray-400 p-2">
          <input
            type="text"
            placeholder="Search Products"
            className="outline-none px-2"
          />
          <FiSearch className="text-xl text-gray-500" />
        </div>

       
        <div className="flex justify-center w-full mx-auto">
          <img 
            src="https://demo-alukas.myshopify.com/cdn/shop/files/alk_logo_footer.png?v=1714702294&width=533" 
            alt="Logo" 
            className="h-6 "
          />
        </div>

        <div className="flex items-center space-x-6">
          <FiUser className="text-xl cursor-pointer" />

          <div className="relative">
            <FiHeart className="text-xl cursor-pointer" />
            <span className="absolute top-[-8px] right-[-8px] text-xs bg-black text-white rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span>
          </div>

          <div className="relative">
            <FiShoppingCart className="text-xl cursor-pointer" onClick={toggleSidebar} />
            <span className="absolute top-[-8px] right-[-8px] text-xs bg-black text-white rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span>
          </div>
        </div>
      </div>

      {showSearchOverlay && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-white flex flex-col items-center justify-center z-50">
          <div className="w-full max-w-2xl">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search for products"
              className="w-full text-center py-2 text-xl border-b border-gray-300 focus:outline-none"
            />
          </div>
          <button
            className="text-3xl mt-4"
            onClick={handleCloseSearch}
          >
            &times;
          </button>
        </div>
      )}

      <CartSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Header;
