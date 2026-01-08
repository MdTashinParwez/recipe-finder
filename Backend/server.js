require('dotenv').config();


const express = require('express');
const colors = require('colors');
const cors = require('cors');
const connectDB = require('./config/db')

connectDB();

const app = express();

// Middleware
app.use(cors())









const port = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send('Hello World!');
})

app.listen(port,()=>
console.log(`Server is running on http://localhost:${port}`.yellow.bold));
