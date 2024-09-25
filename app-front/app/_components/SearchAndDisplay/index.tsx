// "use client";
// import { useState, useEffect } from "react";
// import { FaSearch } from "react-icons/fa";


// interface SearchResult {
//   _id: string;
//   imageUrl: string;
//   title: string;
//   description: string;
//   price: number;
// }

// export default function SearchAndDisplay() {
//   const [searchQuery, setSearchQuery] = useState<string>(""); 
//   const [searchResults, setSearchResults] = useState<SearchResult[]>([]); 

//   const fetchSearchResults = async (query: string) => {
//     try {
//       const collectionsResponse = await fetch(
//         `http://localhost:3001/api/collections?q=${query}`
//       );
//       const collectionsData: SearchResult[] = await collectionsResponse.json();

//       const autumnCollectionResponse = await fetch(
//         `http://localhost:3001/api/autumncollection?q=${query}`
//       );
//       const autumnCollectionData: SearchResult[] = await autumnCollectionResponse.json();

//       const featuredProductsResponse = await fetch(
//         `http://localhost:3001/api/featuredproducts?q=${query}`
//       );
//       const featuredProductsData: SearchResult[] = await featuredProductsResponse.json();

//       const combinedResults = [
//         ...collectionsData,
//         ...autumnCollectionData,
//         ...featuredProductsData,
//       ];

//       setSearchResults(combinedResults);
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//     }
//   };

//   const handleSearch = () => {
//     if (searchQuery.trim() !== "") {
//       fetchSearchResults(searchQuery);
//     }
//   };

//   return (
//     <div className="container mx-auto py-8">
    
//       <div className="relative flex justify-center mb-8">
//         <input
//           type="text"
//           placeholder="Search Products"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="outline-none border p-2 w-[300px] rounded-md"
//         />
//         <button
//           onClick={handleSearch}
//           className="ml-2 bg-blue-500 text-white p-2 rounded-md"
//         >
//           <FaSearch />
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
//         {searchResults.map((item) => (
//           <div
//             key={item._id}
//             className="relative group overflow-hidden transition-transform duration-300 border p-4"
//           >
//             <img
//               src={item.imageUrl}
//               alt={item.title}
//               className="object-cover w-full h-[200px] transition-opacity duration-300 hover:opacity-80"
//             />
//             <div className="mt-4 text-center">
//               <h3 className="text-xs uppercase">{item.description}</h3>
//               <p className="text-gray-600 mt-2">{item.title}</p>
//               <p className="text-sm text-black font-semibold mt-2">
//                 ${item.price}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
