const express = require('express');
const {createPost} = require("../controllers/post");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

// console.log("auth", isAuthenticated);
//by using the isAuthenticated method we are making our route protected at the backend as well
// it means that no one can post unless or until they are logged in
// the isAuthenticated method is called first
router.route("/post/upload").post(isAuthenticated, createPost);

module.exports = router;