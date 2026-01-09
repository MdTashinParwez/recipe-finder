// import React, { useState } from 'react'
// import SearchBar from '../components/SearchBar'
// import { searchRecipes } from '../services/recipeService';
// import RecipeCard from '../components/RecipeCard';

// function HomePage() {
//   const [recipes, setRecipes] = useState([]);
//   const [searched, setSearched] = useState(false);

//   const handleSearch = async(query) =>{
//     const results = await searchRecipes(query);
//     setRecipes(results);
//     setSearched(true);
//   };

//   return (
//     <div>
//       <h1> recipe home page</h1>
//       <p> search for your favourite</p>

//       <SearchBar  onSearch={handleSearch}/>
//     </div>
//   )
// }

// export default HomePage
// src/pages/HomePage.jsx

import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import { searchRecipes } from '../services/recipeService';
import RecipeCard from '../components/RecipeCard';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (query) => {
    const results = await searchRecipes(query);
    setRecipes(results);
    setSearched(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 text-center">
      <h1 className="text-4xl font-bold mb-2">Recipe Finder</h1>
      <p className="text-gray-600 mb-6">
        Search for your favorite recipes here!
      </p>

      <SearchBar onSearch={handleSearch} />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8 mt-8 text-left">
        {recipes.map(recipe => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))}
      </div>

      {searched && recipes.length === 0 && (
        <p className="mt-8 text-lg text-gray-500">
          No recipes found. Please try a different search term!
        </p>
      )}
    </div>
  );
};

export default HomePage;
