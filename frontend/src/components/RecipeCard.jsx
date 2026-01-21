import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const RecipeCard = ({ recipe }) => {
  const { idMeal, strMeal, strMealThumb } = recipe;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="cursor-pointer"
    >
      <Link to={`/recipe/${idMeal}`}>
        <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-72 sm:h-80 md:h-64 lg:h-72">
          {/* Image */}
          <img
            src={strMealThumb}
            alt={strMeal}
            className="w-full h-full object-cover"
          />

          {/* Gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40"></div>

          {/* Title */}
          <h3 className="absolute bottom-4 left-4 text-white text-lg sm:text-xl md:text-lg lg:text-xl font-semibold drop-shadow-lg">
            {strMeal}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
};

export default RecipeCard;

// src/components/RecipeCard.jsx

// import React from 'react';
// import { Link } from 'react-router-dom';

// // --- HIGHLIGHT: Import the MUI Card component system ---
// import {
//   Card,
//   CardActionArea,
//   CardMedia,
//   CardContent,
//   Typography,
// } from '@mui/material';

// /**
//  * RecipeCard component refactored with Material-UI.
//  *
//  * @param {object} props - The component's props.
//  * @param {object} props.recipe - The recipe object to display.
//  * @returns {React.ReactElement} An interactive recipe card built with MUI.
//  */
// const RecipeCard = ({ recipe }) => {
//   return (
//     // <Card> is the root container. It provides the background, border-radius, and shadow (elevation).
//     <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      
//       {/* <CardActionArea> makes the entire card surface a single, clickable button-like area.
//           It provides a beautiful ripple effect on interaction.
//           The `component={Link}` and `to={...}` props are the key to integrating
//           with React Router. It tells MUI to render a Link component but style it
//           like a CardActionArea.
//       */}
//       <CardActionArea
//         component={Link}
//         to={`/recipe/${recipe.idMeal}`}
//         sx={{ flexGrow: 1 }} // Allows the action area to grow and fill the card height
//       >

//         {/* <CardMedia> is optimized for displaying images or videos in a card. */}
//         <CardMedia
//           // We tell it to render an `<img>` tag under the hood.
//           component="img"
//           // We can set a fixed height for consistency.
//           height="200"
//           // The `image` prop is the URL for the media.
//           image={recipe.strMealThumb}
//           // The `alt` text is crucial for accessibility.
//           alt={recipe.strMeal}
//         />

//         {/* <CardContent> provides standard padding for the card's text content. */}
//         <CardContent>

//           {/* <Typography> is used for all text to ensure it adheres to the theme's
//               typographic scale (font sizes, weights, and line heights).
//           */}
//           <Typography gutterBottom variant="h6" component="div">
//             {recipe.strMeal}
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//     </Card>
//   );
// };

// export default RecipeCard;

