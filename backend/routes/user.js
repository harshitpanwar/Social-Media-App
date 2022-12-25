const express = require('express');
const  router = express.Router();
const { register, login, followAndUnfollowUser, logout, updatePassword, updateProfile, myProfile, getUserProfile, getAllUsers } = require('../controllers/user');
const { isAuthenticated } = require("../middlewares/auth");

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").get(isAuthenticated, logout);

router.route("/follow/:id").get(isAuthenticated, followAndUnfollowUser);

router.route("/update/password").put(isAuthenticated, updatePassword);

router.route("/update/profile").put(isAuthenticated, updateProfile);

router.route("/me").get(isAuthenticated, myProfile);

router.route("/user/:id").get(isAuthenticated, getUserProfile);

router.route("/users").get(isAuthenticated, getAllUsers);


module.exports = router;