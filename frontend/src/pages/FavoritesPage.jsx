import React, { useState, useEffect } from 'react';
import { getFavorites, removeFavorite, updateFavoriteNote } from '../services/favoriteService';
import { getRecipeById } from '../services/recipeService';
import RecipeCard from '../components/RecipeCard';
import LoadingSpinner from '../components/LoadingSpinner';
import NotesEditModal from '../components/NotesEditModal';

const FavoritesPage = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const favoriteObjects = await getFavorites();

        if (favoriteObjects.length === 0) {
          setFavoriteRecipes([]);
          return;
        }

        const recipes = await Promise.all(
          favoriteObjects.map(fav => getRecipeById(fav.recipeId))
        );

        const combined = recipes.map(recipe => {
          const fav = favoriteObjects.find(
            f => f.recipeId === recipe.idMeal
          );

          return {
            ...recipe,
            notes: fav?.notes || '',
          };
        });

        setFavoriteRecipes(combined);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (id) => {
    await removeFavorite(id);
    setFavoriteRecipes(prev =>
      prev.filter(r => r.idMeal !== id)
    );
  };

  const handleOpenModal = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  const handleSaveNotes = async (recipeId, newNotes) => {
    try {
      await updateFavoriteNote(recipeId, newNotes);

      setFavoriteRecipes(prev =>
        prev.map(recipe =>
          recipe.idMeal === recipeId
            ? { ...recipe, notes: newNotes }
            : recipe
        )
      );

      handleCloseModal();
    } catch (err) {
      alert(err.message || 'Failed to save notes');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 px-6 py-10">

       
        <h1 className="text-4xl font-extrabold text-center mb-12">
          🍽️ My Favorite Recipes
        </h1>

        {favoriteRecipes.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No favorites yet 😢 <br />
            <span className="text-sm">Start exploring delicious recipes!</span>
          </div>
        ) : (

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

            {favoriteRecipes.map(recipe => (
              <div
                key={recipe.idMeal}
                className="group bg-white/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden"
              >

             
                <div className="overflow-hidden">
                  <RecipeCard recipe={recipe} />
                </div>

            
                <div className="p-4">

                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-semibold text-gray-700">
                      📝 Notes
                    </h4>

                    <button
                      onClick={() => handleOpenModal(recipe)}
                      className="text-xs px-3 py-1 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition"
                    >
                      ✏️ Edit
                    </button>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg min-h-[60px]">
                    {recipe.notes ? (
                      <p className="text-sm text-gray-600 italic">
                        "{recipe.notes}"
                      </p>
                    ) : (
                      <p className="text-sm text-gray-400 italic">
                        No notes yet...
                      </p>
                    )}
                  </div>

               
                  <button
                    onClick={() => handleRemoveFavorite(recipe.idMeal)}
                    className="mt-4 w-full py-2 rounded-xl bg-gradient-to-r from-red-400 to-red-500 text-white text-sm font-medium hover:scale-105 transition"
                  >
                    ❌ Remove
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}
      </div>

     
      {selectedRecipe && (
        <NotesEditModal
          open={isModalOpen}
          onClose={handleCloseModal}
          recipe={selectedRecipe}
          onSave={handleSaveNotes}
        />
      )}
    </>
  );
};

export default FavoritesPage;