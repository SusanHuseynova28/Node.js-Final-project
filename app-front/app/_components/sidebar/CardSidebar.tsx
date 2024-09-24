import React from "react";
import { FiX, FiShoppingCart, FiTruck, FiTrash } from "react-icons/fi";

export default function CardSidebar({
  isSidebarOpen,
  toggleSidebar,
  cartItems = [],
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
}) {
  const items = cartItems || [];

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full w-[420px] bg-white shadow-lg z-50 transform transition-transform duration-700 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex items-center justify-between border-b">
          <h2 className="text-lg font-semibold">
            Shopping Cart ({items.length})
          </h2>
          <button onClick={toggleSidebar} className="text-gray-500 text-xl">
            <FiX size={20} />
          </button>
        </div>

        <div className="p-4 bg-gray-100 border-b">
          <div className="relative flex items-center ml-3 mt-5 mb-5">
            <div className="absolute flex items-center justify-center w-10 h-10 border-2 border-red-500 rounded-full bg-white">
              <FiTruck className="text-red-500 text-lg" />
            </div>
            <div className="flex-1 ml-4">
              <div className="w-[95%] h-1 bg-gray-300 rounded">
                <div
                  className="bg-red-500 h-full rounded"
                  style={{ width: "30%" }}
                ></div>
              </div>
            </div>
          </div>
          <span className="block mt-2 ml-5 text-sm text-start">
            Spend $100.00 more to enjoy <strong>FREE SHIPPING!</strong>
          </span>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-center mt-8">
              <div className="flex justify-center">
                <FiShoppingCart className="w-16 h-16 text-gray-300" />
              </div>
              <p className="text-black text-lg">Your cart is empty.</p>
              <p className="text-black text-sm mt-2">
                You may check out all the available products and buy some in the
                shop.
              </p>
              <button className="mt-4 bg-black w-[9rem] text-white py-2">
                Return to shop
              </button>
            </div>
          ) : (
            <div>
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between mb-4"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="ml-4 flex-1">
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-sm text-gray-600">${item.price}</p>
                    <div className="flex items-center mt-2">
                      <button
                        className="text-xl px-2 border border-gray-300"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        -
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        className="text-xl px-2 border border-gray-300"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-300"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <FiTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}
