const Post = require("../models/Post");

exports.createPost = async(req, res)=>{

    try{

        const newPostData = {
            //to use this req.body we need to write some commands in our server file
            caption: req.body.caption,
            image:{
                public_id: "hello",
                url: "world",
            },
            owner: req.user_id,
        };

        const newPost = await Post.create(newPostData);

        res.status(201).json({
            success: true,
            post: newPost,
        });

    } catch(error){
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }

}
