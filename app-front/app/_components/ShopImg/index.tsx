'use client';

import React from 'react';
import { FiChevronRight } from 'react-icons/fi'; 
import { useRouter } from 'next/navigation';

export default function Shop()  {

    const router = useRouter();
    const handleNavigateToHome = () => {
        router.push('/home');
      };



  return (
    <div className="relative w-full h-[15rem] mt-10">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://demo-alukas.myshopify.com/cdn/shop/files/alk_bg_collections.jpg?v=1711247313')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-black">
          <h1 className="text-5xl font-light">Shop</h1>
          <div className="flex items-center space-x-2 mt-4 text-sm">
            <a href="#" className="text-gray-300 hover:text-black" onClick={handleNavigateToHome}>
              Home
            </a>
            <FiChevronRight />
            <span>Shop</span>
          </div>
        </div>
      </div>
    </div>
  );
};


