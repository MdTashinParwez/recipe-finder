import React from 'react'
import { useParams } from 'react-router-dom';

function RecipePage() {
  const {recipeId} = useParams(); 
  return (
    <div>
      <h1>Recipe Page</h1>
      <p>Detail for recipe ID: <strong>{recipeId}</strong></p>
    </div>
  )
}

export default RecipePage
