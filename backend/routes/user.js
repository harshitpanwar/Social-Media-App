const express = require('express');
const  router = express.Router();
const { register, login, followAndUnfollowUser } = require('../controllers/user');
const { isAuthenticated } = require("../middlewares/auth");

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/follow/:id").get(isAuthenticated, followAndUnfollowUser);

module.exports = router;