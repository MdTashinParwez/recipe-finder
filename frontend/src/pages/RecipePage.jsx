import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../services/recipeService';
import { AuthContext } from '../context/AuthContext';
import { addFavorite } from '../services/favoriteService';
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const RecipePage = () => {

  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(recipeId);
        setRecipe(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [recipeId]);

  const handleSave = async () => {
    try {
      await addFavorite(recipe.idMeal);
      setFeedback("Saved to favorites ✅");
        if (!user) {
      navigate("/login");
      return;
  }
    } catch {
      setFeedback("Already saved 😅");
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!recipe) return <div className="text-center mt-20">Recipe not found</div>;

  // INGREDIENTS
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const name = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    if (name && name.trim() !== "") {
      ingredients.push({ name, measure });
    }
  }

  // STEPS
  const steps = recipe?.strInstructions
    ? recipe.strInstructions.split('.').filter(step => step.trim() !== "")
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 pb-16">

      <div className="max-w-6xl mx-auto px-4">

        {/* HERO SECTION */}
        <div className="relative mt-6 rounded-2xl overflow-hidden shadow-lg">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-[300px] md:h-[420px] object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

          <div className="absolute bottom-0 p-6 text-white">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
              {recipe.strMeal}
            </h1>

            <div className="flex gap-3 text-sm">
              {recipe.strCategory && (
                <span className="bg-white/20 px-3 py-1 rounded-full">
                  🍛 {recipe.strCategory}
                </span>
              )}
              {recipe.strArea && (
                <span className="bg-white/20 px-3 py-1 rounded-full">
                  🌍 {recipe.strArea}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid md:grid-cols-3 gap-8 mt-10">

          {/* INGREDIENTS */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-md">

            <h2 className="font-bold text-xl mb-5 flex items-center gap-2">
              🧂 Ingredients
            </h2>

            <ul className="space-y-3 text-sm">
              {ingredients.map((item, i) => (
                <li
                  key={i}
                  className="flex justify-between border-b pb-1 text-gray-700"
                >
                  <span>{item.name}</span>
                  <span className="text-gray-500">{item.measure}</span>
                </li>
              ))}
            </ul>

           
                {user ? (
                  <button
                    onClick={handleSave}
                    className="mt-5 w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 hover:scale-105 transition"
                  >
                    ❤️ Save to Favorites
                  </button>
                ) : (
                  <p className=" mt-5 w-full text-sm text-gray-500  bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 hover:scale-105 transition cursor-pointer" >
                    🔒 Login to save this recipe
                  </p>
                )}

            {feedback && (
              <p className="mt-3 text-sm text-green-600 text-center">
                {feedback}
              </p>
            )}
          </div>

          {/* INSTRUCTIONS */}
          <div className="md:col-span-2 bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-md">

            <h2 className="font-bold text-xl mb-5 flex items-center gap-2">
              👨‍🍳 Instructions
            </h2>

            <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="flex gap-3 items-start bg-gray-50 p-3 rounded-lg"
                >
                  <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                    {i + 1}
                  </span>
                  <p>{step.trim()}.</p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default RecipePage;