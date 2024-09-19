'use client';

import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function HomeSwiper() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    {
      src: 'https://demo-alukas.myshopify.com/cdn/shop/files/save_web_slide1_resize.jpg?v=1711681053&width=1800',
      text: 'Introducing The\nLost Day Collection',
      subtitle: 'Ring, Occasion Pieces, Pandora & more collection',
      buttonText: 'Shop Now',
      animation: 'slide-in-from-top',
    },
    {
      src: 'https://demo-alukas.myshopify.com/cdn/shop/files/alk_s2.jpg?v=1710139621&width=1800',
      text: 'New S/S 2024\nAmazing collections',
      subtitle: 'A symbol of love and a modern take on gold.',
      buttonText: 'Shop Now',
      animation: 'slide-in-from-left',
    },
    {
      src: 'https://demo-alukas.myshopify.com/cdn/shop/files/alk_s3.jpg?v=1710139620&width=1800',
      text: 'A Minimalistic\nDesign Masculine',
      subtitle: 'Awesome products for the dynamic urban lifestyle',
      buttonText: 'Shop Now',
      animation: 'slide-in-from-bottom',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); 
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handlePrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <>
      <div className="relative w-full h-[35rem] bg-gray-200 mt-10">
        <div
          className="absolute inset-0 flex items-center justify-between"
          style={{
            backgroundImage: `url(${images[currentIndex].src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <button
            onClick={handlePrevious}
            className="absolute z-10 left-4 top-1/2 transform -translate-y-1/2 text-gray-700 bg-opacity-50 hover:bg-opacity-70 transition-all duration-200"
            style={{
              height: '6rem',
              width: '4rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FiChevronLeft size={70} style={{ height: '5rem', width: '2rem' }} />
          </button>

          <button
            onClick={handleNext}
            className="absolute z-10 right-4 top-1/2 transform -translate-y-1/2 text-gray-700 bg-opacity-50 hover:bg-opacity-70 transition-all duration-200"
            style={{
              height: '6rem',
              width: '4rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FiChevronRight size={70} style={{ height: '5rem', width: '2rem' }} />
          </button>
        </div>

        <div className={`absolute left-0 top-1/4 text-left text-black w-full pl-8 ${images[currentIndex].animation}`}>
          <h2 className="text-5xl ml-[3rem] leading-tight whitespace-pre-line">
            {images[currentIndex].text}
          </h2>
          <p className="text-lg ml-[3rem] mt-2 font-light">
            {images[currentIndex].subtitle}
          </p>
          <button className="mt-6 ml-[3rem] px-6 py-3 bg-transparent border border-black text-black font-semibold hover:bg-black hover:text-white transition-all duration-300">
            {images[currentIndex].buttonText}
          </button>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`w-[0.35rem] h-[0.35rem] rounded-full ${currentIndex === idx ? 'bg-gray-600' : 'bg-black'}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
