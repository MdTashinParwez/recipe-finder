require('dotenv').config();


const express = require('express');
const colors = require('colors');
const cors = require('cors');
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');



connectDB();

const app = express();

// Middleware
app.use(cors())
app.use(express.json());





// ROUTES

app.use('/api/users',require('./routes/userRoutes'));
app.use('/api/favorites', require('./routes/favoriteRoutes'));




const port = process.env.PORT || 5000;





app.listen(port,()=>
console.log(`Server is running on http://localhost:${port}`.yellow.bold));
