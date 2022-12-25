const express = require('express');
const {createPost, likeAndUnlikePost, deletePost, getPostsFollowing, updatePost} = require("../controllers/post");
const { updateProfile } = require('../controllers/user');
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

// console.log("auth", isAuthenticated);
//by using the isAuthenticated method we are making our route protected at the backend as well
// it means that no one can post unless or until they are logged in
// the isAuthenticated method is called first
router.route("/post/upload").post(isAuthenticated, createPost);

//here we pass the id in params therefore we can directly call the get method
//and we can pass the arguments in the params of the route 
router.route("/post/:id").get(isAuthenticated, likeAndUnlikePost);

//adding the delete method on the same route either we can just add 
//the method at he end of the previous route or we can create a seprate route 
router.route("/post/:id").delete(isAuthenticated, deletePost);

//udpate caption of the post uploaded
router.route("/post/:id").put(isAuthenticated, updatePost);

//get all posts of all the users that the logged in user has followed
router.route("/posts").get(isAuthenticated, getPostsFollowing);


module.exports = router;