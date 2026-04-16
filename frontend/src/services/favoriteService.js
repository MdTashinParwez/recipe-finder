import axios  from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_API_URL}/api/favorites`;

export const updateFavoriteNote = async (recipeId, notes) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token found. Please login again.');
  }

  try {
    const res = await axios.put(
      `${API_URL}/${recipeId}`,
      { notes }, // body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (err) {
    throw err.response?.data || new Error('Failed to update note');
  }
};

export const addFavorite = async(recipeId) =>{

    const token = localStorage.getItem('token');

    if(!token){
        throw new Error ('You must be logged in to add a favorite. THANKS')
    }
     const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const body = { recipeId };
  try {
    const response = await axios.post(API_URL, body, config);
    return response.data;
  } catch (error) {
        throw error.response.data || new Error('An unknown error occurred ! ( for devloper: [favoriteService]).');

  }
};

export const getFavorites = async() =>{
    const token = localStorage.getItem('token');
    // jwt retrive
    if(!token ){
        throw new Error('Authentication token not found');

    }

    //axios config

    const config = {
        headers: {
            Authorization:  `Bearer ${token}`,
        },
    };

    try{
        const response = await axios.get(API_URL, config);
        return response.data;
    }catch(error){
        throw error.response.data || new Error('Failed to fetch favorites.');
    }
};


export const removeFavorite = async(recipeId) =>{
    const token = localStorage.getItem('token');
    // jwt retrive
    if(!token ){
        throw new Error('Authentication token not found');

    }

    //axios config

    const config = {
        headers: {
            Authorization:  `Bearer ${token}`,
        },
    };

    try{
        const response = await axios.delete(`${API_URL}/${recipeId}`, config);
        return response.data;
    }catch(error){
        throw error.response.data || new Error('Failed to remove favorite..');
    }
};

