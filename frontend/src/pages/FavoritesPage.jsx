// import React, { useState, useEffect } from 'react';
// import { getFavorites } from '../services/favoriteService';
// import './FavoritesPage.css';
// import { getRecipeById } from '../services/recipeService';

// const FavoritesPage = () => {
//     const [favoriteRecipes, setFavoriteRecipes] = useState([]);

//   const [favoriteIds, setFavoriteIds] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchFavoriteIds = async () => {
//       try {
//         setError(null);
//         setLoading(true);
//         const ids = await getFavorites();
//         setFavoriteIds(ids);
//       } catch (err) {
//         setError(err.message || 'An error occurred while fetching your favorites.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFavoriteIds();
    
//   }, []);
//   if (loading) {
//     return <div className="favorites-status">Loading your favorite recipes...</div>;
//   }
//   if (error) {
//     return <div className="favorites-status error">{error}</div>;
//   }

//   return (
//     <div className="favorites-page-container">
//       <h1>My Favorite Recipes</h1>
      
//       {favoriteIds.length === 0 ? (
//         <p>You haven't saved any favorite recipes yet. Start exploring!</p>
//       ) : (
//         <div>
//           <p>You have {favoriteIds.length} favorite recipes.</p>
//           <div className="debug-ids-list">
//             <h3>(For Debugging) Your Favorite Recipe IDs:</h3>
//             <ul>
//               {favoriteIds.map(id => <li key={id}>{id}</li>)}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FavoritesPage;
// src/pages/FavoritesPage.jsx


import React, { useState, useEffect } from 'react';

import { getFavorites, removeFavorite } from '../services/favoriteService';
import { getRecipeById } from '../services/recipeService'; 
import RecipeCard from '../components/RecipeCard';
import './FavoritesPage.css';

const FavoritesPage = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const ids = await getFavorites();
        if (ids.length === 0) {
          setLoading(false);
          return;
        }
        const recipePromises = ids.map(id => getRecipeById(id));

        const recipes = await Promise.all(recipePromises);
        
        setFavoriteRecipes(recipes);

      } catch (err) {
        setError(err.message || 'An error occurred while fetching your favorites.');
      } finally {
        // 6. No matter what, we are done loading.
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []); 

  const handleRemoveFavorite  = async(recipeId) =>{
    try {
      await removeFavorite(recipeId);
       setFavoriteRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.idMeal !== recipeId)
      );
    } catch (err) {
      console.error('Failed to remove favorite:', err);
      alert(err.message || 'Could not remove favorite. Please try again.');
      
    }
  }

  if (loading) {
    return <div className="favorites-status">Loading your favorite recipes...</div>;
  }

  if (error) {
    return <div className="favorites-status error">{error}</div>;
  }

  return (
    <div className="favorites-page-container">
      <h1>My Favorite Recipes</h1>
      
      {favoriteRecipes.length === 0 ? (
        <p>You haven't saved any favorite recipes yet. Start exploring!</p>
      ) : (
        <div className="recipe-grid">
          {favoriteRecipes.map(recipe => (
          
            <div key={recipe.idMeal} className="favorite-card-container">
              <RecipeCard recipe={recipe} />
              <button 
                onClick={() => handleRemoveFavorite(recipe.idMeal)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;