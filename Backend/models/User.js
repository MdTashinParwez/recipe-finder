const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Name is required']
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
         match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email',
            ],

        },
    
    password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: 6,
        },
        
        favorites: [
            {
                recipeId: {
                    type: String,
                    required: true,
                },

                notes:{
                    type: String,
                    default: '',
                }
            }
        ],
         },

         { timestamps: true }
);

// hasing password before saving the user 
userSchema.pre('save', async function   (next){

     if (!this.isModified('password')){
        return;
     }

     const salt = await bcrypt.genSalt(10);
     this.password = await bcrypt.hash(this.password, salt);

    //  next();


});
module.exports = mongoose.model('User',userSchema);