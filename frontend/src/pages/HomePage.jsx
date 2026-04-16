import React, { useState, useEffect, useRef } from "react";
import SearchBar from "../components/SearchBar";
import { searchRecipes } from "../services/recipeService";
import RecipeCard from "../components/RecipeCard";
import { useSearchParams } from "react-router-dom";

const heroImage =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [searched, setSearched] = useState(false);
  const [queryText, setQueryText] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const resultsRef = useRef(null);

  
  useEffect(() => {
    const query = searchParams.get("search");
    if (query) {
      handleSearch(query, false);
    }
  }, []);

  
  const handleSearch = async (query, shouldScroll = true) => {
    setQueryText(query);
    setSearchParams({ search: query });

    const results = await searchRecipes(query);
    setRecipes(results || []);
    setSearched(true);

    if (shouldScroll) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }, 200);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      <div
        className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-orange-900/40"></div>

        <div className="absolute w-[500px] h-[500px] bg-orange-500/20 blur-3xl rounded-full top-[-100px] left-[-100px]"></div>
        <div className="absolute w-[400px] h-[400px] bg-pink-500/20 blur-3xl rounded-full bottom-[-100px] right-[-100px]"></div>

        <div className="relative z-10 max-w-3xl text-center px-6">
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
            🍔 Find Your Next
            <span className="block text-orange-400">Favorite Meal</span>
          </h1>

          <p className="mt-5 text-lg text-gray-200">
            Search, save & cook delicious recipes with a vibe ✨
          </p>

          <div className="mt-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          <div className="flex justify-center gap-3 mt-6 flex-wrap">
            {["🍕 Pizza", "🍜 Noodles", "🍰 Dessert", "🥗 Healthy"].map(tag => (
              <span
                key={tag}
                className="bg-white/10 text-white px-3 py-1 rounded-full text-sm backdrop-blur"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {searched && (
        <div ref={resultsRef} className="max-w-7xl mx-auto px-4 mt-14">
          <h2 className="text-3xl font-bold text-gray-800">
            🔍 Results for{" "}
            <span className="text-orange-500">"{queryText}"</span>
          </h2>

          <p className="text-gray-500 mt-1">
            {recipes.length} recipes found 🍽️
          </p>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 mt-10 pb-16">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {recipes.map((recipe) => (
            <div
              key={recipe.idMeal}
              className="transform hover:scale-105 transition duration-300"
            >
              <RecipeCard recipe={recipe} />
            </div>
          ))}

        </div>

        {searched && recipes.length === 0 && (
          <div className="text-center mt-20">
            <p className="text-4xl">😕🍜</p>
            <p className="text-xl font-semibold text-gray-700 mt-3">
              No recipes found
            </p>
            <p className="text-gray-500 mt-2">
              Try searching "chicken", "pasta", or "cake"
            </p>
          </div>
        )}
      </div>

    </div>
  );
};

export default HomePage;