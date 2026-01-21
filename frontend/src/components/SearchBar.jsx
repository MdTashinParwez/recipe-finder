// import React, { useState } from "react";
// import { Box, TextField, Button } from '@mui/material';

// function SearchBar({ onSearch }) {
//   const [query, setQuery] = useState("");

//   const handleInputChange = (e) => setQuery(e.target.value);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (query.trim()) onSearch(query);
//     // setQuery(""); // optional: keep typed text visible
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="flex w-full max-w-md mx-auto bg-white rounded-full shadow-md overflow-hidden border border-gray-200"
//     >
//       <input
//         type="text"
//         value={query}
//         onChange={handleInputChange}
//         placeholder="Search for recipes..."
//         className="flex-1 px-4 py-2 text-gray-700 focus:outline-none"
//       />
//       <button
//         type="submit"
//         className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6"
//       >
//         Search
//       </button>
//     </form>
//   );
// }

// export default SearchBar;
import { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full max-w-xl mx-auto bg-white rounded-full shadow-md border border-gray-200 px-4 py-2"
    >
      <Search className="text-gray-400 mr-3" size={20} />

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search recipes, ingredients, or cuisines..."
        className="flex-1 text-gray-700 placeholder-gray-400 focus:outline-none"
      />

      <button
        type="submit"
        className="ml-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-full transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;

