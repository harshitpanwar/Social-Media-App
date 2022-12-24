const Post = require("../models/Post");
const User = require("../models/User");

exports.createPost = async(req, res)=>{

    try{

        const newPostData = {
            //to use this req.body we need to write some commands in our server file
            caption: req.body.caption,
            image:{
                public_id: "hello",
                url: "world",
            },
            owner: req.user._id,
        };

        console.log("new Post data", newPostData);
        const newPost = await Post.create(newPostData);

        const user = await User.findById(req.user._id);

        user.posts.push(newPost._id);

        await user.save();

        res.status(201).json({
            success: true,
            post: newPost,
        });

    } catch(error){
        res.status(500).json({
            success: false,
            message: error.message,
            value:"yeah this one",
        });
    }

}
