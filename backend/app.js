const express = require('express');
const app = express();

//dotenv setup

if(process.env.NODE_ENV!=='production'){
    require("dotenv").config({path: "backend/config/config.env"});
}


//using Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//importing our routes
const post = require("./routes/post");
const user = require("./routes/user");


//using routes
app.use("/api/v1", post);
app.use("/api/v1", user);

module.exports = app;