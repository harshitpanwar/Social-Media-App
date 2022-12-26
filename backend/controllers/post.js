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

exports.likeAndUnlikePost = async(req, res) => {

    // console.log(req);
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


        // console.log(post.likes);
        
        // console.log("user id yeri\n",req.user);
        // console.log(req.user._id);
        // console.log(post.likes);
        // console.log(post);
        // console.log(post.likes.includes(req.user.id));
        // console.log(post.likes.indexOf(req.user.id));
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

        //else case when the user has not liked the post already 
        // just make it like the post and add his req.user._id to the likes array

        else{

            post.likes.push(req.user._id);

            await post.save();

            return res.status(200).json({

                success: true,
                message: "Post Liked",

            });
        }

        
    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.deletePost = async(req, res) => {

try {

    //get params from the route
    const post = await Post.findById(req.params.id);

    // if post does not exist
    if(!post){
        return res.status(404).json({
            success: false,
            message: "Post not found",
        });
    }

    // if the user deleting the post is not the same as the owner of the post
    if(post.owner.toString() !== req.user._id.toString()){

        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        })

    }

    // the post here will be removed
    await post.remove();

    // but we also have to remove the post id 
    // from user who has this post id 
    // in their User Schema
    const user = await User.findById(req.user._id);

    // find the index in array where the post is saved
    const index = user.posts.indexOf(req.params.id);

    //remove starting from the index upto one element
    user.posts.splice(index, 1);

    await user.save();
    
    res.status(200).json({
        success: true, 
        message: "Post Deleted",
    })



} 
catch (error) {
    res.status(500).json({
        success:false,
        message: error.message,
    })
}

}

exports.getPostsFollowing = async(req, res) => {
    try {

        //now we can get all posts of the ones we are following by using the populate method
        // as shown below

        // const user = await User.findById(req.user._id).populate("following", "posts");

        // res.status(200).json({
        //     success: true,
        //     following: user.following,
        // });

        //that was one way to doing it 
        // we can also use another way

        //here we use the $in method of mongodb 
        // here we can pass a list of data from which we can match a property
        // for example here we are matching the "owner" field in our schema of Post
        // from the list of user.following
        // user.following gives us the _id list of all users whom we are following
        // then using the $in method we match the field owner of the schema Post
        // thus we get all the posts from the users that we are following

        const user = await User.findById(req.user._id);

        const posts = await Post.find({
            owner: {
                $in: user.following,
            },
        });

        res.status(200).json({
            success: true,
            posts,
        })

        
    } catch (error) {
        res.status(500).json({
            success: false, 
            error: error.message,
        })
    }
}

exports.updatePost = async(req, res) => {

    try {

        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(400).json({
                success: false, 
                message: "Post not found",
            });
        }

        if(post.owner.toString() !== req.user._id.toString()){
            return res.status(400).json({
                success: false,
                message: "Unauthorised",
            });
        }

        const caption = req.body.caption;

        if(!caption){
            return res.status(400).json({
                success: false,
                message: "Enter Valid Caption",
            });
        }

        post.caption = caption;

        await post.save();

        res.status(200).json({
            success: true,
            message: "Caption Updated successfully",

        });
        
    } catch (error) {
        res.status(400).json({
            success: true,
            message: error.message,
        });
    }

}

exports.addComment = async(req, res) =>{
    try {

        // TODO
        
    } catch (error) {
        
    }
}