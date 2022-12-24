const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    caption:String,

    image:{
        public_id:String,
        url:String
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
    }, 

    createdAt:{
        type: Date, 
        default: Date.now,
    }, 

    likes: [
        {
            user:{
                type:mongoose.Schema.Types.ObjectId, 
                ref: "User",
            }
        }
    ],

    comments:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            commnet:{
                type:String, 
                required:true,
            }
        }
    ]

});

module.exports = mongoose.model("Post", postSchema);