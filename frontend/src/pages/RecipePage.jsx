import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../services/recipeService';

const RecipePage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
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
    fetchRecipeDetails();
  }, [recipeId]);

  /* ---------------- Ingredients Logic ---------------- */
  const ingredients = [];
  if (recipe) {
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== '') {
        ingredients.push({ ingredient, measure });
      } else {
        break;
      }
    }
  }

  /* ---------------- UI States ---------------- */

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl font-semibold text-gray-600">
        Loading recipe...
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl font-semibold text-red-500">
        Recipe not found.
      </div>
    );
  }

  /* ---------------- Main UI ---------------- */

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      
      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        {recipe.strMeal}
      </h1>

      {/* Image + Ingredients */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Image */}
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Ingredients */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Ingredients
          </h2>

          <ul className="space-y-2">
            {ingredients.map((item, index) => (
              <li
                key={index}
                className="flex justify-between border-b pb-1 text-gray-700"
              >
                <span className="font-medium">{item.ingredient}</span>
                <span className="text-sm text-gray-500">{item.measure}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Instructions
        </h2>

        <div className="space-y-3 text-gray-700 leading-relaxed">
          {recipe.strInstructions
            .split('\n')
            .map(
              (line, index) =>
                line.trim() && <p key={index}>{line}</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
