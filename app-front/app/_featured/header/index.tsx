"use client";
import { useState } from "react";
import Link from "next/link";
import { FiSearch, FiUser, FiShoppingCart, FiHeart } from "react-icons/fi";
import { LuChevronDown } from "react-icons/lu";
import { MdOutlineLocalPhone } from "react-icons/md";
import { FiMapPin } from "react-icons/fi";
import CardSidebar from "@/app/_components/sidebar/CardSidebar";


export default function Navbar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isHomeHovered, setIsHomeHovered] = useState(false);
  const [isPagesHovered, setIsPagesHovered] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <header>
      <div className="bg-black text-white text-sm flex justify-between items-center px-10 py-3">
        <div className="flex space-x-4 ">
          <div>English</div>
          <div>United States (USD $)</div>
          <div>
            <Link href="#">
              <span className="hover:underline cursor-pointer">
                Summer Sale 15% off!{" "}
                <span className="underline">Shop Now!</span>
              </span>
            </Link>
          </div>
        </div>
        <div className="flex space-x-4 ">
          <Link href="#">
            <span className="hover:underline cursor-pointer">
              Store Location
            </span>
          </Link>
          <Link href="#">
            <span className="hover:underline cursor-pointer">Contact</span>
          </Link>
          <Link href="#">
            <span className="hover:underline cursor-pointer">About</span>
          </Link>
          <Link href="#">
            <span className="hover:underline cursor-pointer">Gift Cards</span>
          </Link>
        </div>
      </div>

      <div className="flex justify-between items-center px-10 py-8 border-b">
        <div className="flex items-center space-x-4">
          <div className="flex items-center border h-[3rem] w-[17rem] border-gray-400 p-2">
            <input
              type="text"
              placeholder="Search Products"
              className="outline-none px-2"
            />
            <FiSearch className="text-xl text-gray-500" />
          </div>
        </div>

        <div className="text-2xl font-bold flex justify-center  flex-grow">
          <svg
            width="210"
            height="27"
            viewBox="0 0 210 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.152 26H22.104L11.34 0.835998L0.288 26H3.24L6.12 19.232H16.344L19.152 26ZM7.164 16.712L11.268 7.1L15.3 16.712H7.164ZM25.4905 1.988V26H34.7785V23.48H28.1545V1.988H25.4905ZM41.0569 1.988H38.3929V17.432C38.3929 19.448 38.6089 21.392 39.9049 23.192C41.3449 25.172 43.8649 26.432 46.9249 26.432C49.9849 26.432 52.5049 25.172 53.9449 23.192C55.2409 21.392 55.4569 19.448 55.4569 17.432V1.988H52.7929V16.712C52.7929 18.728 52.7929 20.924 50.8849 22.544C49.9129 23.372 48.2569 23.912 46.9249 23.912C45.5929 23.912 43.9369 23.372 42.9649 22.544C41.0569 20.924 41.0569 18.728 41.0569 16.712V1.988ZM64.3303 1.988H61.6663V26H64.3303V15.668L65.0143 14.984L74.8423 26H78.5143L66.9223 13.184L78.1543 1.988H74.5543L64.3303 12.284V1.988ZM98.1833 26H101.135L90.3713 0.835998L79.3193 26H82.2713L85.1513 19.232H95.3753L98.1833 26ZM86.1953 16.712L90.2993 7.1L94.3313 16.712H86.1953ZM116.987 5.336C116.447 4.292 115.619 3.32 114.647 2.672C113.459 1.88 112.271 1.592 110.795 1.592C106.907 1.592 104.063 4.076 104.063 7.784C104.063 9.584 104.675 10.7 105.719 11.708C106.799 12.752 107.987 13.256 108.923 13.688L111.083 14.696C112.343 15.272 113.279 15.704 113.963 16.352C114.827 17.144 115.151 18.08 115.151 19.16C115.151 21.572 113.603 23.912 110.327 23.912C109.103 23.912 107.915 23.624 106.871 22.58C106.187 21.86 105.611 20.78 105.431 19.52L102.839 20.24C103.163 21.68 103.883 23.336 105.071 24.488C106.727 26.108 108.707 26.432 110.291 26.432C114.611 26.432 117.887 23.48 117.887 19.052C117.887 17.324 117.383 15.92 116.159 14.696C115.151 13.688 113.855 13.04 112.451 12.428L110.147 11.42C109.247 11.024 108.347 10.628 107.627 9.908C106.979 9.296 106.727 8.756 106.727 7.82C106.727 5.588 108.383 4.112 110.759 4.112C112.127 4.112 112.991 4.58 113.459 4.94C113.999 5.372 114.539 6.092 114.863 6.74L116.987 5.336ZM147.694 15.596C147.01 16.532 146.254 17.396 144.958 18.764L139.954 12.32C141.502 11.024 141.286 11.312 141.898 10.772C143.806 9.116 144.13 7.532 144.13 6.416C144.13 4.004 142.402 1.592 139.054 1.592C135.598 1.592 133.834 4.148 133.834 6.668C133.834 8.288 134.59 9.728 136.21 11.816C135.706 12.14 133.438 13.544 132.178 14.804C131.386 15.596 130.018 17.18 130.018 19.772C130.018 23.588 133.042 26.432 136.966 26.432C139.702 26.432 142.618 24.74 144.706 22.652L147.298 26H150.61L146.578 20.78C148.054 19.268 148.99 18.116 149.638 17.216L147.694 15.596ZM143.086 20.672C142.186 21.536 139.486 23.984 136.93 23.984C134.446 23.984 132.682 22.112 132.682 19.736C132.682 17.864 133.69 16.892 134.374 16.28C135.058 15.668 135.994 14.876 137.758 13.796L143.086 20.672ZM137.326 8.9C136.858 8.252 136.354 7.568 136.354 6.524C136.354 5.012 137.542 3.896 139.018 3.896C140.278 3.896 141.61 4.688 141.61 6.38C141.61 7.208 141.358 8.072 139.99 9.152L138.406 10.376L137.326 8.9ZM180.819 3.968C177.939 1.772 175.167 1.592 173.727 1.592C166.527 1.592 161.163 6.92 161.163 14.084C161.163 21.032 166.455 26.432 173.583 26.432C175.383 26.432 178.155 26 180.819 24.092V20.78C180.387 21.212 179.415 22.112 178.047 22.796C176.787 23.444 175.203 23.912 173.583 23.912C169.191 23.912 163.899 20.636 163.899 14.12C163.899 8.576 168.003 4.112 173.547 4.112C174.951 4.112 176.427 4.472 177.687 5.048C178.911 5.624 180.063 6.524 180.819 7.28V3.968ZM196.929 26.432C203.877 26.432 209.421 21.14 209.421 14.012C209.421 6.848 203.841 1.592 196.929 1.592C190.017 1.592 184.437 6.848 184.437 14.012C184.437 21.14 189.981 26.432 196.929 26.432ZM196.929 4.112C202.329 4.112 206.685 8.504 206.685 14.012C206.685 19.52 202.329 23.912 196.929 23.912C191.529 23.912 187.173 19.52 187.173 14.012C187.173 8.504 191.529 4.112 196.929 4.112Z"
              fill="#222222"
            />
          </svg>
        </div>

        <div className="flex items-center space-x-6">
          <FiUser className="text-2xl cursor-pointer" />
          <div className="relative">
            <FiHeart className="text-2xl cursor-pointer" />
            <span className="absolute top-[-8px] right-[-8px] text-xs bg-black text-white rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span>
          </div>

          <div className="relative">
            <FiShoppingCart
              className="text-2xl cursor-pointer"
              onClick={toggleSidebar}
            />
            <span className="absolute top-[-8px] right-[-8px] text-xs bg-black text-white rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span>
          </div>
        </div>
      </div>

      <nav className="bg-white border-t relative h-[2rem]">
        <div className="flex px-14 py-2 mt-2">
          <div className="flex justify-between items-center space-x-8 w-full">
            <div className="flex">
              <div>
                <span className="text-xl">Browse Categories</span>
              </div>
              <div className="mt-2">
                <LuChevronDown />
              </div>
            </div>

            <div className="flex justify-center items-center">
              <div className="flex items-center space-x-8">
                <div
                  className="flex relative group "
                  onMouseEnter={() => setIsHomeHovered(true)}
                  onMouseLeave={() => setIsHomeHovered(false)}
                >
                  <Link
                    href="/home"
                    className="underline-animation cursor-pointer "
                  >
                    HOME
                  </Link>
                  <span className="mt-1">
                    <LuChevronDown />
                  </span>

                  {isHomeHovered && (
                    <div className="absolute top-full left-0 pt-2 bg-white border shadow-lg z-50 w-[240px] ">
                      <ul className="text-left">
                        {[
                          "Home v1 - Default",
                          "Home v2 - Classic",
                          "Home v3 - Mega Shop",
                          "Home v4 - Handmade",
                          "Home v5 - Minimal",
                          "Home v6 - Grid Showcase",
                          "Home v7 - Simple",
                          "Home v8 - Modern",
                          "Home v9 - Collection",
                          "Home v10 - LookBook",
                          "Home v11 - Landing",
                          "Home v12 - Instagram",
                          "Home v13 - Fashion 1",
                          "Home v14 - Fashion 2",
                          "Home v15 - Fashion 3",
                          "Home v16 - RTL",
                        ].map((item, index) => (
                          <li
                            key={index}
                            className="px-4 py-2 relative underline-animation-item"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex">
                  <Link href="/shop" className="underline-animation cursor-pointer">
                    SHOP
                  </Link>
                  <span className="mt-1">
                    <LuChevronDown />
                  </span>
                </div>

                <div className="flex">
                  <Link href="#" className="underline-animation cursor-pointer">
                    PRODUCT
                  </Link>
                  <span className="mt-1">
                    <LuChevronDown />
                  </span>
                </div>

                <div
                  className="flex relative group"
                  onMouseEnter={() => setIsPagesHovered(true)}
                  onMouseLeave={() => setIsPagesHovered(false)}
                >
                  <Link href="#" className="underline-animation cursor-pointer">
                    PAGES
                  </Link>
                  <span className="mt-1">
                    <LuChevronDown />
                  </span>

                  {isPagesHovered && (
                    <div className="absolute top-full left-0 pt-2 bg-white border shadow-lg z-50 w-[240px]">
                      <ul className="text-left">
                        {[
                          "About us V1",
                          "About us V2",
                          "About me",
                          <Link href="/contact">Contact</Link>,
                          "Store location",
                          "Career",
                          "Brands",
                          "Compare",
                          "Timeline",
                          "FAQ",
                          "Recently viewed products",
                          "404 error",
                          "My account",
                        ].map((item, index) => (
                          <li
                            key={index}
                            className="px-4 py-2 relative underline-animation-item"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex">
                  <Link href="#" className="underline-animation cursor-pointer">
                    BLOGS
                  </Link>
                  <span className="mt-1">
                    <LuChevronDown />
                  </span>
                </div>

                <div className="flex">
                  <Link href="#" className="underline-animation cursor-pointer">
                    BUY ALUKAS
                  </Link>
                  <span className="mt-1">
                    <LuChevronDown />
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">
                  <MdOutlineLocalPhone />
                </span>
                <span className="text-xl">( +800 ) 1234 56</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xl">
                  <FiMapPin />
                </span>
                <span className="text-xl">Our Stores</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <CardSidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
    </header>
  );
}