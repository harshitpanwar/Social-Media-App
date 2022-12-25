const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = async(req, res, next) => {

try {
    // console.log('yaha tak to pahuch gya');

    const { token } = req.cookies;
    // console.log(token);
    // console.log(req.cookies.token);

    if(!token){
        return res.status(401).json({
            message:"Please login first",
        });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    // console.log(decoded);
    req.user = await User.findById(decoded._id);

    // console.log(req.user);

    next();     

} catch (error) {
    console.log("kuch dikkat aari h");
    res.status(500).json({
        message: error.message,
    })
}

};