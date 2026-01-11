import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL ;
const recipeApi = axios.create({
    baseURL : API_URL,
});


// @param{string}
// @return{promise<arra>}

export const searchRecipes = async(query) =>{

try {
    const response = await recipeApi.get(`/search.php?s=${query}`);
    return response.data.meals || [];
} catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
}
};


export const getRecipeById = async(id) =>{
    try {
       const response = await recipeApi.get(`/lookup.php?i=${id}`);
       
       return response.data.meals  ? response.data.meals[0] : null; 
    } catch (error) {
        console.error(`Error fetching recipe with id ${id}:`, error);
        return null;
    }
}

// export default recipeApi;