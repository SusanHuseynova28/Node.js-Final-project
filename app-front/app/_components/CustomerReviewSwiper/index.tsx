"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"; // Import Pagination styles
import { Pagination } from "swiper/modules"; // Import Pagination module

export default function CustomerReviewSwiper() {
  const reviews = [
    {
      id: 1,
      name: "Donald Duck",
      title: "Alukas is my favourite store",
      review:
        "Great products and designs and such great quality, they always wash up well no matter how many times ",
      rating: 5,
    },
    {
      id: 2,
      name: "Niamh Oxley",
      title: "Beautiful products",
      review:
        "Beautiful clothes. I always get complements. Good quality and items wash well.",
      rating: 5,
    },
    {
      id: 3,
      name: "Mary Green",
      title: "Lovely products",
      review:
        "Great products and designs and such great quality, they always wash up well no matter how many times ",
      rating: 5,
    },
    {
      id: 4,
      name: "John Doe",
      title: "Amazing service",
      review:
        "The customer service was amazing and the products were of great quality.",
      rating: 5,
    },
    {
      id: 5,
      name: "Jane Smith",
      title: "Fantastic designs",
      review:
        "The designs are fantastic, and I love how durable the products are.",
      rating: 5,
    },
  ];

  return (
    <div
      className="container mx-auto py-14 bg-cover bg-center mt-10"
      style={{
        backgroundImage: `url('https://demo-alukas.myshopify.com/cdn/shop/files/alk_bg_testi.jpg?v=1711954099')`,
      }}
    >
      <h2 className="text-center text-3xl  mb-10">Customer Review</h2>
      <Swiper
        slidesPerView={3} // Show 3 cards initially
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1, // 1 card on small screens
          },
          1024: {
            slidesPerView: 3, // Show 3 cards on medium/large screens
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="p-10 w-[400px] h-[300px] bg-white flex flex-col items-center justify-center mx-auto mt-6">
              <div className="h-12 w-12 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold mb-4">
                &#8220;
              </div>
              <h4 className="text-xl mb-4 ">{review.title}</h4>
              <p className="text-gray-600 mb-4 text-center">{review.review}</p>
              <div className="flex gap-16">
              <p className="text-gray-500 italic mb-4">- {review.name} -</p>
              <div className="flex justify-center">
                {Array.from({ length: review.rating }, (_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-orange-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 17.27l6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73-1.64 7.03z" />
                  </svg>
                ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
