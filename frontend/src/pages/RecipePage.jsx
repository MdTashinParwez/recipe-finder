// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { getRecipeById } from '../services/recipeService';

// const RecipePage = () => {
//   const { recipeId } = useParams();
//   const [recipe, setRecipe] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRecipeDetails = async () => {
//       try {
//         setLoading(true);
//         const data = await getRecipeById(recipeId);
//         setRecipe(data);
//       } catch (error) {
//         console.error('Failed to fetch recipe details', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchRecipeDetails();
//   }, [recipeId]);

//   /* ---------------- Ingredients Logic ---------------- */
//   const ingredients = [];
//   if (recipe) {
//     for (let i = 1; i <= 20; i++) {
//       const ingredient = recipe[`strIngredient${i}`];
//       const measure = recipe[`strMeasure${i}`];

//       if (ingredient && ingredient.trim() !== '') {
//         ingredients.push({ ingredient, measure });
//       } else {
//         break;
//       }
//     }
//   }

//   /* ---------------- UI States ---------------- */

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen text-xl font-semibold text-gray-600">
//         Loading recipe...
//       </div>
//     );
//   }

//   if (!recipe) {
//     return (
//       <div className="flex justify-center items-center min-h-screen text-xl font-semibold text-red-500">
//         Recipe not found.
//       </div>
//     );
//   }

//   /* ---------------- Main UI ---------------- */

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
      
//       {/* Title */}
//       <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
//         {recipe.strMeal}
//       </h1>

//       {/* Image + Ingredients */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
//         {/* Image */}
//         <div className="rounded-2xl overflow-hidden shadow-lg">
//           <img
//             src={recipe.strMealThumb}
//             alt={recipe.strMeal}
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* Ingredients */}
//         <div className="bg-white rounded-2xl shadow-lg p-6">
//           <h2 className="text-2xl font-semibold mb-4 text-gray-800">
//             Ingredients
//           </h2>

//           <ul className="space-y-2">
//             {ingredients.map((item, index) => (
//               <li
//                 key={index}
//                 className="flex justify-between border-b pb-1 text-gray-700"
//               >
//                 <span className="font-medium">{item.ingredient}</span>
//                 <span className="text-sm text-gray-500">{item.measure}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Instructions */}
//       <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
//         <h2 className="text-2xl font-semibold mb-4 text-gray-800">
//           Instructions
//         </h2>

//         <div className="space-y-3 text-gray-700 leading-relaxed">
//           {recipe.strInstructions
//             .split('\n')
//             .map(
//               (line, index) =>
//                 line.trim() && <p key={index}>{line}</p>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecipePage;


// src/pages/RecipePage.jsx

// --- HIGHLIGHT: Import the necessary hooks and new service function ---
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../services/recipeService';
import { AuthContext } from '../context/AuthContext';
import { addFavorite } from '../services/favoriteService'; // Our new service function!
import LoadingSpinner from '../components/LoadingSpinner';


const RecipePage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- HIGHLIGHT: We already use this to show/hide the button. It's now doubly important. ---
  const { user } = useContext(AuthContext);

  // --- HIGHLIGHT: Add state to hold feedback messages for the user (e.g., success or error). ---
  // Using an object allows us to store both the message and a 'type' for styling.
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const data = await getRecipeById(recipeId);
        setRecipe(data);
      } catch (error) {
        console.error('Failed to fetch recipe details', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [recipeId]);
  
  // --- HIGHLIGHT: Create the asynchronous handler function for the button's onClick event ---
  const handleSaveToFavorites = async () => {
    // Clear any previous feedback messages before making a new request.
    setFeedback({ message: '', type: '' });

    try {
      // Call our service function, passing the current recipe's ID.
      // The `recipe` object from TheMealDB has the ID in the `idMeal` property.
      const response = await addFavorite(recipe.idMeal);
      // On success, set a positive feedback message from the backend's response.
      setFeedback({ message: response.message || 'Saved to favorites!', type: 'success' });
    } catch (err) {
      // If the service throws an error, we catch it and set a negative feedback message.
      setFeedback({ message: err.message || 'Failed to save favorite.', type: 'error' });
    }
  };

  // if (loading) return <div className="loading-state">Loading recipe...</div>;
  // if (!recipe) return <div className="not-found-state">Recipe not found.</div>;
   if (loading) return <LoadingSpinner />;
   if (!recipe) return <Typography>Recipe not found.</Typography>;

  // Helper to extract ingredients (no changes here)
  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (recipe[`strIngredient${i}`]) {
        ingredients.push(
          <li key={i}>
            {recipe[`strIngredient${i}`]} - {recipe[`strMeasure${i}`]}
          </li>
        );
      }
    }
    return ingredients;
  };

  return (
    <div className="recipe-page">
      <h1>{recipe.strMeal}</h1>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-page-image" />
      
      {/* --- HIGHLIGHT: Add the onClick handler and the feedback message with conditional rendering --- */}
      {/* The button is already conditionally rendered based on the user's login status. */}
      {user && (
        <div className="favorite-action">
          <button onClick={handleSaveToFavorites} className="save-button">
            Save to Favorites
          </button>
        </div>
      )}

      {/* This element will render our success or error message only when a message exists. */}
      {feedback.message && (
        <p className={`feedback-message ${feedback.type}`}>
          {feedback.message}
        </p>
      )}

      <div className="recipe-details">
        {/* ... (rest of the JSX for ingredients and instructions remains the same) ... */}
        <div className="recipe-ingredients">
          <h2>Ingredients</h2>
          <ul>{getIngredients()}</ul>
        </div>
        <div className="recipe-instructions">
          <h2>Instructions</h2>
          <p>{recipe.strInstructions}</p>
        </div>
      </div>
    </div>
  );
};

export  default RecipePage;