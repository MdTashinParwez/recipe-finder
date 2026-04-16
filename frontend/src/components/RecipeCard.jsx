
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const RecipeCard = ({ recipe }) => {
  const { idMeal, strMeal, strMealThumb } = recipe;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group cursor-pointer"
    >
      <div className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">

        <Link to={`/recipe/${idMeal}`}>
          <img
            src={strMealThumb}
            alt={strMeal}
            className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
          />
        </Link>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        <div className="absolute top-3 left-3 bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs text-white">
          🍽️ Recipe
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
          <Link
            to={`/recipe/${idMeal}`}
            className="bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-semibold shadow hover:bg-orange-500 hover:text-white transition"
          >
            View Recipe →
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-4">
          <h3 className="text-white text-lg font-semibold leading-tight line-clamp-2">
            {strMeal}
          </h3>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/80 to-transparent"></div>

      </div>
    </motion.div>
  );
};

export default RecipeCard;