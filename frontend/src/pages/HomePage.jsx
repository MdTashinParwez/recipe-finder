
// import React, { useState } from 'react';
// import SearchBar from '../components/SearchBar';
// import { searchRecipes } from '../services/recipeService';
// import RecipeCard from '../components/RecipeCard';

// const HomePage = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [searched, setSearched] = useState(false);

//   const handleSearch = async (query) => {
//     const results = await searchRecipes(query);
//     setRecipes(results);
//     setSearched(true);
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-8 text-center">
//       <h1 className="text-4xl font-bold mb-2">Recipe Finder</h1>
//       <p className="text-gray-600 mb-6">
//         Search for your favorite recipes here!
//       </p>

//       <SearchBar onSearch={handleSearch} />

//       <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8 mt-8 text-left">
//         {recipes.map(recipe => (
//           <RecipeCard key={recipe.idMeal} recipe={recipe} />
//         ))}
//       </div>

//       {searched && recipes.length === 0 && (
//         <p className="mt-8 text-lg text-gray-500">
//           No recipes found. Please try a different search term!
//         </p>
//       )}
//     </div>
//   );
// };

// export default HomePage;
import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import { searchRecipes } from "../services/recipeService";
import RecipeCard from "../components/RecipeCard";

const heroImage =
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1470&q=80";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (query) => {
    const results = await searchRecipes(query);
    setRecipes(results);
    setSearched(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <div
        className="relative w-full h-96 sm:h-[28rem] md:h-[32rem] flex items-center justify-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            Find Your Favorite Recipes
          </h1>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl text-white drop-shadow-md">
            Explore thousands of delicious meals from around the world
          </p>
          <div className="mt-6">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {recipes.length > 0 && (
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Search Results
          </h2>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))}
        </div>

        {searched && recipes.length === 0 && (
          <p className="mt-12 text-center text-lg text-gray-500">
            No recipes found. Please try a different search term!
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
