// import React from 'react'

// function RecipeCard({recipe}) {
//     const {strMeal , strMealThumb} = recipe;
//   return (
//     <div className="recipe-card">
//       <img src={strMealThumb} alt={strMeal}  className='recipe-card-image'/>
//       <div className="recipe-card-body">
//         <h3 className="recipe-card-title">{strMeal}</h3>
//       </div>
//     </div>
//   )
// }

// export default RecipeCard

import React from "react";

function RecipeCard({ recipe }) {
  const { strMeal, strMealThumb } = recipe;

  return (
    <div
      className="
        bg-white 
        border border-gray-200 
        rounded-xl 
        overflow-hidden 
        shadow-md 
        cursor-pointer
        transition 
        duration-200 
        ease-in-out
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <img
        src={strMealThumb}
        alt={strMeal}
        className="w-full h-[200px] object-cover"
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {strMeal}
        </h3>
      </div>
    </div>
  );
}

export default RecipeCard;
