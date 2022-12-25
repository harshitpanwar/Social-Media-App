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

    }
     catch(error){
        res.status(500).json({
            success: false,
            message: error.message,
            value:"yeah this one",
        });
    }

}

exports.likeAndUnlikePost = async (req, res) => {

    try {
        //get parameters from the route

        const post = await Post.findById(req.params.id);

        // post not found
        if(!post){
            return res.status(404).json({
                success: false,
                message: "Post Not Found"
            });

        }

        // if our user has already liked the post
        // then remove his like and
        // if the user has not liked the post
        // add the user._id of the user to the post's like array

        if(post.likes.includes(req.user._id)){

            // finds the index of the array 
            const index = post.likes.indexOf(req.user._id);

            post.likes.splice(index, 1);

            await post.save();

            return res.status(200).json({
                success:true,
                message: "Post Unliked",
            });

        }
        else{
            post.likes.push(req.user._id);

            await post.save();

            return res.status(200).json({

                success: true,
                message: "Post Liked",
            });
        }

        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}