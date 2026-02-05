const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const router = express.Router();

router.post('/', protect, async (req, res) => {
  try {
    const {recipeId} = req.body;

      if (!recipeId) {
      return res.status(400).json({ message: 'recipeId is required' });
    }

    const user = await User.findById(req.user.id).select('+favorites');
    

    if(!user){
      return res.status(404).json({ message: 'User not found' });
    }

    const isAlreadyFavorite = user.favorites.some(
      (favorite) => favorite.recipeId.toString() === recipeId.toString()

    );
     if (isAlreadyFavorite) {
      return res.status(400).json({ message: 'Recipe is already in favorites' });
    }
      user.favorites.push({ recipeId });
      await user.save();

     res.status(201).json({
      message: 'Recipe added to favorites successfully',
      favorites: user.favorites, // Return the updated list
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error ( for dev: route isfavorite) ' });
  }
})

router.put('/:recipeId', protect , async (req,res) =>{
  try {
    const {recipeId} = req.params;
    const {notes} = req.body;

    if(notes === undefined){
      return res.status(400).json({message: 'Notes field is required'});
    }

    const updatedUser = await User.findOneAndUpdate(
      {_id: req.user.id, 'favorites.recipeId': recipeId},
      { $set: {'favorites.$.notes': notes }},
      {new: true}
    );

    
     if (!updatedUser) {
      return res.status(404).json({ message: 'Favorite recipe not found for this user.' });
    }
        res.status(200).json({
      message: 'Notes updated successfully',
      favorites: updatedUser.favorites,
    });


    

    
  } catch (error) {
     console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
})

const getFavorites = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json(user.favorites);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const addFavorite = asyncHandler(async (req, res) => {
  const { recipeId } = req.body;

  if (!recipeId) {
    res.status(400);
    throw new Error("Recipe Id is required");
  }

  const user = await User.findById(req.user._id);

  if (user) {
    if (user.favorites.includes(recipeId)) {
      res.status(400); // Bad Request
      throw new Error("Recipe is already in favorites");
    }

    user.favorites.push(recipeId);

    //  Save the updated user document back to the database.
    await user.save();

    res.status(201).json({
      message: "Recipe added to favorites successfully",
      favorites: user.favorites,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});


const removeFavorite = asyncHandler(async (req, res) => {
  const { recipeId } = req.params;

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { favorites: recipeId },
    },
    {
      new: true,
    }
  );

  if (updatedUser) {
    res.status(200).json({
      message: 'Recipe removed from favorites successfully',
      favorites: updatedUser.favorites,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

router.route("/").get(protect, getFavorites).post(protect, addFavorite);

router.route("/:recipeId").delete(protect, removeFavorite);

module.exports = router;
