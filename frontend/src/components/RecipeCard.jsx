

// // import React from 'react';
// // // HIGHLIGHT: Import the Link component from react-router-dom
// // import { Link } from 'react-router-dom';
// // // import './RecipeCard.css';

// // const RecipeCard = ({ recipe }) => {
// //   const { idMeal, strMeal, strMealThumb } = recipe;

// //   // HIGHLIGHT: The entire card is now wrapped in a Link component.
// //   // The `to` prop constructs the dynamic URL for the specific recipe page.
// //   // We use a template literal to inject the recipe's unique `idMeal`.
// //   return (
// //     <Link to={`/recipe/${idMeal}`} className="recipe-link">
// //       <div className="recipe-card">
// //         <img src={strMealThumb} alt={strMeal} className="recipe-card-image" />
// //         <div className="recipe-card-body">
// //           <h3 className="recipe-card-title">{strMeal}</h3>
// //         </div>
// //       </div>
// //     </Link>
// //   );
// // };

// // export default RecipeCard;

// import React from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// const RecipeCard = ({ recipe }) => {
//   const { idMeal, strMeal, strMealThumb } = recipe;

//   return (
//     <motion.div
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//       className="cursor-pointer"
//     >
//       <Link to={`/recipe/${idMeal}`}>
//         <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
//           {/* Image */}
//           <img
//             src={strMealThumb}
//             alt={strMeal}
//             className="w-full h-64 object-cover"
//           />

//           {/* Gradient overlay */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>

//           {/* Title */}
//           <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold drop-shadow-lg">
//             {strMeal}
//           </h3>
//         </div>
//       </Link>
//     </motion.div>
//   );
// };

// export default RecipeCard;

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const RecipeCard = ({ recipe }) => {
  const { idMeal, strMeal, strMealThumb } = recipe;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="cursor-pointer"
    >
      <Link to={`/recipe/${idMeal}`}>
        <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-72 sm:h-80 md:h-64 lg:h-72">
          {/* Image */}
          <img
            src={strMealThumb}
            alt={strMeal}
            className="w-full h-full object-cover"
          />

          {/* Gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40"></div>

          {/* Title */}
          <h3 className="absolute bottom-4 left-4 text-white text-lg sm:text-xl md:text-lg lg:text-xl font-semibold drop-shadow-lg">
            {strMeal}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
};

export default RecipeCard;
