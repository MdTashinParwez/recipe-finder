const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT TOKEN
const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
}

// Register User 

const  registerUser = async(req, res) =>{
    try {

        const { name , email, password} = req.body;
        if(!name || !email || !password){
            res.status(400);
            throw new Error('Add all fiedls')
        }

        const userExists = await User.findOne({email});

        if(userExists){
            res.status(400);
            throw new Error ('User already exists')
        }

        const user = await User.create({
            name,email,
            password,
        });

        if(user){
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        }
        else{
            res.status(400);
            throw new Error ('Invalid user data');
        }




    } catch (error){
        res.status(res.statusCode || 500).json({message: error.message});
        
    }
}

// Login User

const loginUser = async(req,res) =>{
    try {
       const {email,password} = req.body;
       const user = await User.findOne({email});
       
       if((user && (await bcrypt.compare(password, user.password)))){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });

       }
       else{
        res.status(400);
        throw new Error('Invalid credentials');
       }

    } catch (error) {
    res.status(res.statusCode || 500).json({ message: error.message });

    }
}


module.exports = {
    registerUser,
    loginUser,
};
