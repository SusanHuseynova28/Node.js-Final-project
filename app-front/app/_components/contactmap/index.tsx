"use client";

import React from "react";
import { FiChevronRight } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function ContactPageMap() {
  const router = useRouter();

  const handleNavigateToHome = () => {
    router.push("/home");
  };

  return (
    <div className="contact-page-container">
      <div className="breadcrumb flex items-center space-x-2 py-4 px-8 text-black">
        <a
          className="text-gray-500 cursor-pointer"
          onClick={handleNavigateToHome}
        >
          Home
        </a>
        <FiChevronRight className="text-gray-500" />
        <a className="text-gray-500 cursor-pointer">Pages</a>
        <FiChevronRight className="text-gray-500" />
        <span>Contact</span>
      </div>

      <div className="text-center py-8">
        <h1 className="text-4xl font-medium">Contact</h1>
        <p className="text-[1.2rem] mt-5 text-gray-600">
          Click on your nearest store location below to set the road on Google
          Map.
        </p>
      </div>

      <div className="relative w-full h-[37rem]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3154.8939060848147!2d144.81158271584684!3d-37.74563313792195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65fa6debeb781%3A0xe1d23f5d1759961e!2s184%20Main%20Rd%20E%2C%20St%20Albans%20VIC%203021%2C%20%C3%9Ac!5e0!3m2!1svi!2s!4v1618277125252!5m2!1svi!2s"
          className="absolute inset-0 p-[1rem] mt-[2rem] mb-[2rem] w-full h-full"
          allowFullScreen=""
          loading="lazy"
          style={{ border: 0 }}
          title="Google Map"
        ></iframe>
      </div>

      <div className="contact-info-container flex justify-center mt-[3rem] mb-[3rem] gap-[13rem] space-x-16 py-8">
        <div className="text-center flex flex-col items-center">
          <img
            src="https://demo-alukas.myshopify.com/cdn/shop/files/our_store.png?v=1711509794"
            alt="Our Store"
          />
          <h3 className="font-semibold py-2">OUR STORE</h3>
          <p className="text-center">
            7021 Washington SQ. <br /> South New York, NY 10012
          </p>
        </div>

        <div className="text-center flex flex-col items-center">
          <img
            src="https://demo-alukas.myshopify.com/cdn/shop/files/contact_info.png?v=1711509794"
            alt="Contact Info"
          />
          <h3 className="font-semibold py-2">CONTACT INFO</h3>
          <p className="text-center">
            Telephone: 703.172.3412 <br />
            E-mail: hello@example.com
          </p>
        </div>

        <div className="text-center flex flex-col items-center">
          <img
            src="https://demo-alukas.myshopify.com/cdn/shop/files/busness_hours.png?v=1711509794"
            alt="Business Hours"
          />
          <h3 className="font-semibold py-2">BUSINESS HOURS</h3>
          <p className="text-center">
            Monday - Sunday: <br /> 09:00 am - 20:00 pm
          </p>
        </div>
      </div>
    </div>
  );
}
