import React, { useState, useEffect } from 'react';
import { getFavorites, removeFavorite } from '../services/favoriteService';
import { getRecipeById } from '../services/recipeService'; 
import RecipeCard from '../components/RecipeCard';
import './FavoritesPage.css';
import LoadingSpinner from '../components/LoadingSpinner';

const FavoritesPage = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  // useEffect(() => {
  //   const fetchFavorites = async () => {
  //     try {
  //       setLoading(true);
  //       setError(null);
        
  //       const ids = await getFavorites();
  //       if (ids.length === 0) {
  //         setLoading(false);
  //         return;
  //       }
  //       const recipePromises = ids.map(id => getRecipeById(id));

  //       const recipes = await Promise.all(recipePromises);
        
  //       setFavoriteRecipes(recipes);

  //     } catch (err) {
  //       setError(err.message || 'An error occurred while fetching your favorites.');
  //     } finally {
  //       // 6. No matter what, we are done loading.
  //       setLoading(false);
  //     }
  //   };

  //   fetchFavorites();
  // }, []); 

  // new one

  // useEffect(() =>{
  //   const fetchAndProcessFavorites = async() =>{
  //     try {
  //       setLoading(true);
  //       setError(null);

  //       const favoriteObjects = await getFavorites();

  //       if(favoriteObjects.length === 0){
  //         setFavoriteRecipes([]);
  //         setLoading(false);
  //         return;
  //       }

  //       const recipeIds = favoriteObjects.map(fav => fav.recipeId);
        
  //       const recipeDetailPromises = recipeIds.map(id =>
  //       getRecipeById(id)
  //       );

  //       const fetchedRecipeDetails = await Promise.all(recipeDetailPromises);

  //       const combinedFavorites = fetchedRecipeDetails.map(recipe => {
  //         const userFavoriteData = favoriteObjects.find(fav => fav.recipeId === recipe.idMeal);
  //       })

  //       return{
  //         ...recipe,
  //         notes: userFavoriteData ? userFavoriteData.notes : '',
  //       } 

  //       setFavoriteRecipes(combinedFavorites);
  //     } catch (error) {
  //               setError(error.message || 'An error occurred while fetching your favorites.');

  //     }
  //     finally {
  //       setLoading(false);
  //     }
  //   };

  //       fetchAndProcessFavorites();

  // },[]);

useEffect(() => {
  const fetchAndProcessFavorites = async () => {
    try {
      setLoading(true);
      setError(null);

      const favoriteObjects = await getFavorites();

      if (favoriteObjects.length === 0) {
        setFavoriteRecipes([]);
        return;
      }
      const recipeIds = favoriteObjects.map(fav => fav.recipeId);

      // ✅ STEP 2: Promises banao (MISSING PART)
      const recipeDetailPromises = recipeIds.map(id =>
        getRecipeById(id)
      );

      // ✅ STEP 3: Fetch all recipes
      const fetchedRecipeDetails = await Promise.all(recipeDetailPromises);

      // ✅ STEP 4: Combine recipe + notes
      const combinedFavorites = fetchedRecipeDetails.map(recipe => {
        const userFavoriteData = favoriteObjects.find(
          fav => fav.recipeId === recipe.idMeal
        );

        return {
          ...recipe,
          notes: userFavoriteData ? userFavoriteData.notes : '',
        };
      });

      setFavoriteRecipes(combinedFavorites);

    } catch (error) {
      setError(error.message || 'An error occurred while fetching your favorites.');
    } finally {
      setLoading(false);
    }
  };
  fetchAndProcessFavorites();
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
  };


  if (loading) {
    return <LoadingSpinner />;
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

               <div className="recipe-notes">
                <h4>My Notes:</h4>

                {recipe.notes ? (
                  <p className="notes-text">{recipe.notes}</p>
                ) : (
                  <p className="notes-empty">No notes yet.</p>
                )}
              </div>
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