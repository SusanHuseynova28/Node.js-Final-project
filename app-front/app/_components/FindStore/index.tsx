export default function FindStore() {
    return (
      <div className="bg-[#f9ebf9] w-[85%] py-6 flex justify-center items-center mx-auto mt-10">
        <div className="flex items-center space-x-4">
          <span className="text-gray-700 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 9.75L12 4.5l9 5.25v9.75a2.25 2.25 0 01-2.25 2.25h-13.5A2.25 2.25 0 013 19.5V9.75z"
              />
            </svg>
            <span className="ml-2 text-2xl">Find Shops Near You</span>
          </span>
          <button className="border border-black border-b-2 py-1 px-6 hover:text-white hover:bg-black">
            Find Store
          </button>
        </div>
      </div>
    );
  }
  