
import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => setQuery(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
    // setQuery(""); // optional: keep typed text visible
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md mx-auto bg-white rounded-full shadow-md overflow-hidden border border-gray-200"
    >
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for recipes..."
        className="flex-1 px-4 py-2 text-gray-700 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
