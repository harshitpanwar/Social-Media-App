//connecting database
//this step can be done directly inside app.js also 
// but to make the code readable we are doing it here.

const mongoose = require('mongoose');

//extra code for some version mismatch issues
mongoose.set('strictQuery', true);

exports.connectDatabase = () =>{
    mongoose
        .connect(process.env.MONGO_URI)
        .then((con) => console.log(`Database Connected: ${con.connection.host}`))
        .catch((err) => console.log(`An error occured \n ${err}`));
};

