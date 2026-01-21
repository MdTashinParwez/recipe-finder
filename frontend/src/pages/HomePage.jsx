// import React, { useState } from "react";
// import SearchBar from "../components/SearchBar";
// import { searchRecipes } from "../services/recipeService";
// import RecipeCard from "../components/RecipeCard";

// const heroImage =
//   "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1470&q=80";

// const HomePage = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [searched, setSearched] = useState(false);

//   const handleSearch = async (query) => {
//     const results = await searchRecipes(query);
//     setRecipes(results);
//     setSearched(true);
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* Hero */}
//       <div
//         className="relative w-full h-96 sm:h-[28rem] md:h-[32rem] flex items-center justify-center"
//         style={{
//           backgroundImage: `url(${heroImage})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         {/* <div className="absolute inset-0 bg-black bg-opacity-40"></div> */}
//         <div className="relative z-10 text-center px-4">
//           <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
//             Find Your Favorite Recipes
//           </h1>
//           <p className="mt-4 text-lg sm:text-xl md:text-2xl text-white drop-shadow-md">
//             Explore thousands of delicious meals from around the world
//           </p>
//           <div className="mt-6">
//             <SearchBar onSearch={handleSearch} />
//           </div>
//         </div>
//       </div>

//       {/* Recipes Grid */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {recipes.length > 0 && (
//           <h2 className="text-3xl font-bold text-gray-800 mb-6">
//             Search Results
//           </h2>
//         )}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {recipes.map((recipe) => (
//             <RecipeCard key={recipe.idMeal} recipe={recipe} />
//           ))}
//         </div>

//         {searched && recipes.length === 0 && (
//           <p className="mt-12 text-center text-lg text-gray-500">
//             No recipes found. Please try a different search term!
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomePage;
import React, { useState,useEffect,useRef  } from "react";
import SearchBar from "../components/SearchBar";
import { searchRecipes } from "../services/recipeService";
import RecipeCard from "../components/RecipeCard";
import { Container, Grid } from "@mui/material";
import { useSearchParams } from "react-router-dom";
// import LoadingSpinner from '../components/LoadingSpinner';


const heroImage =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80";


const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [searched, setSearched] = useState(false);
  const [queryText, setQueryText] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const resultsRef = useRef(null);
  // const [loading, setLoading] = useState(false);
  useEffect(() => {
  const query = searchParams.get("search");
  if (query) {
    handleSearch(query, false); // false = no scroll
  }
}, []);

  // const handleSearch = async (query) => {
  //   setQueryText(query);
  //   const results = await searchRecipes(query);
  //   setRecipes(results);
  //   setSearched(true);

  //   // Smooth scroll to results
  //   setTimeout(() => {
  //     window.scrollTo({
  //       top: 350,
  //       behavior: "smooth",
  //     });
  //   }, 200);
  // };
  const handleSearch = async (query, shouldScroll = true) => {
  setQueryText(query);
  setSearchParams({ search: query });

  // setLoading(true);
  const results = await searchRecipes(query);
  setRecipes(results || []);
  setSearched(true);
      // setLoading(false);


  setTimeout(() => {
    resultsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 200);
};


  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ================= HERO SECTION ================= */}
      {/* Hero Section */}
<div
  className="relative w-full min-h-[75vh] flex items-center justify-center"
  style={{
    backgroundImage: `url(${heroImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/60"></div>

  {/* Content */}
  <div className="relative z-10 max-w-3xl text-center px-6">
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
      Discover Delicious Recipes, Instantly
    </h1>

    <p className="mt-4 text-lg sm:text-xl text-gray-200">
      Search your favorite meals, save them, and cook like a pro — all in one place.
    </p>

    <div className="mt-8">
      {/* SearchBar yahin rahega */}
      <SearchBar onSearch={handleSearch} />
    </div>
  </div>
</div>


      {/* ================= SEARCH FEEDBACK ================= */}
      {searched && (
        <div ref={resultsRef} className="max-w-7xl mx-auto px-4 mt-10">
          <h2 className="text-2xl font-semibold text-gray-800">
            Search Results
            {queryText && ` for "${queryText}"`}
            {recipes.length > 0 && ` (${recipes.length})`}
          </h2>
          <p className="text-gray-500 mt-1">
            Showing recipes matching your search
          </p>
        </div>
      )}

      {/* ================= RECIPES GRID ================= */}
      <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
        <Grid container spacing={4}>
          {recipes.map((recipe) => (
            <Grid
              item
              key={recipe.idMeal}
              xs={12}
              sm={6}
              md={4}
              lg={3}
            >
              <RecipeCard recipe={recipe} />
            </Grid>
          ))}
        </Grid>

        {/* ================= EMPTY STATE ================= */}
        {searched && recipes.length === 0 && (
          <div className="text-center mt-20">
            <p className="text-2xl font-semibold text-gray-700">
              😕 No recipes found
            </p>
            <p className="text-gray-500 mt-2">
              Try searching with a different keyword
            </p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default HomePage;
