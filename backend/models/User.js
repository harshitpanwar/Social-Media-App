const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

    name:{
        type:String, 
        required:[true, "Please enter a name"],
    },

    avatar:{
        public_id:String,
        url:String,
    },

    email:{
        type:String,
        required:[true, "Please enter an email"],
    },

    //In password, select is false means when we fetch data for an user the password field will not called by default
    //If we want to select password then we have to do it manually by using the .select method
    //For example in cases of login we need to access the password field to match the password 
    //so there we have to select the password manually by using the method discussed above
    password:{
        type:String,
        required: [true, "Please enter a Password"],
        minLength: [6, "Password must be at least 6 characters"],
        select:false,
    },

    posts:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Post",
        },
    ],

    followers:[
        {
            type:mongoose.Types.ObjectId,
            ref:"User",
        }
    ],

    following:[
        {
            type:mongoose.Types.ObjectId,
            ref:"User",
        },
    ],

});

//whenever the schema will be saved 
// async functin will be called
// we are using this because we want to hash our password before storing it inside our database

userSchema.pre("save", async function(next){

    //if our password has been modified then and then only
    // our password will be hashed
    // because if our password has not been changed and some other data has been changed 
    // then in that case we will update only those particular fields
    // and not "rehash" our passwords

    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }

    //else
    next();

});


//making our own method to compare stored password and hashed password while login

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

//generating jwt token
userSchema.methods.generateToken = function(){
    return  jwt.sign({_id: this._id}, process.env.JWT_SECRET);
};

module.exports = mongoose.model("User", userSchema);