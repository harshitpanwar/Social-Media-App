const User = require("../models/User");

exports.register = async(req, res) =>{

    try{

        const {name, email, password} = req.body;
        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        } 

        user = await User.create({
            name, email, password,
            avatar: {public_id: "sample_id", url: "sample url",}
        });

        const options = {expires:new Date(Date.now()+90*24*60*60*1000),
            httpOnly:true,};

        const token = await user.generateToken();

        res.status(201).cookie("token", token, options).
        json({
            success: true,
            user: user,
            token,
        });


    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }

}

exports.login = async(req, res) =>{
    
    try {
        
        const {email, password} = req.body;

        // here we use the select method to select the password field from the user schema model 
        // as by default it is selected as select:false we have done it manually
        // because here we need to compare these passwords
        const user = await User.findOne({email}).select("+password");

        if(!user){
            return res.status(400).json({
                success: false,
                message: "User does not exist",
            });
        }

        const isMatch = await user.matchPassword(password);

        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Incorrect Password",
            });
        }

        const options = {expires:new Date(Date.now()+90*24*60*60*1000),
            httpOnly:true,};

        const token = await user.generateToken();

        res.status(200).cookie("token", token, options).
        json({
            success: true,
            user: user,
            token,
        });

    } 
    catch (error) {
        
        res.status(500).json({
            success: false,
            message: error.message,
        })

    }

}

exports.logout = async(req, res) => {
    try {

        res
            .status(200)
            .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true})
            .json({
                success: true,
                message: "Logged out",
            });
        
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.followAndUnfollowUser = async(req, res) => {

    try {

        const userToFollow = await User.findById(req.params.id);

        const loggedInUser = await User.findById(req.user._id);

        //if user to follow doesn't exist
        if(!userToFollow){
            return res.status(404).json({
                success: false,
                message: "user not found",
            });
        }

        //if the user already has followed then unfollow
        if(loggedInUser.following.includes(userToFollow._id)){

            const idx1 = loggedInUser.following.indexOf(userToFollow._id);
            loggedInUser.following.splice(idx1, 1);

            const idx2 = userToFollow.followers.indexOf(loggedInUser._id);
            userToFollow.followers.splice(idx2, 1);

            await loggedInUser.save();
            await userToFollow.save();

            res.status(200).json({
                success: true,
                message: "User unfollowed Successfully",
            });

        }

        //else follow the user
        else{

            loggedInUser.following.push(userToFollow._id);
            userToFollow.followers.push(loggedInUser._id);
    
            await loggedInUser.save();
            await userToFollow.save();
    
            res.status(200).json({
                success: true,
                message: "user followed successfully",
            });

        }
        
    } 
    catch (error) {
        
        res.status(400).json({
            success: false,
            message: error.message,
        });
        
    }

    



}

exports.updatePassword = async(req, res) => {

    try {
        
        const user = await User.findById(req.user._id).select("+password");

        const { oldPassword, newPassword } = req.body;

        //if either of the fields in empty
        if(!oldPassword || !newPassword){
            return res.status(400).json({
                success: false,
                message: "Please provide old password and new password",
            });
        }
        
        //check if the old Password matches our current password
        const isMatch = await user.matchPassword(oldPassword);

        //if it doesn't match return false
        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Wrong Old Password",
            });
        }
        
        //else update the password
        user.password = newPassword;
        await user.save();
        
        res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });
        
    }
}

exports.updateProfile = async(req, res) => {

    try {

        const user = await User.findById(req.user._id);

        const {name, email} = req.body;

        if(name){
            user.name = name;
        }
        if(email){
            user.email = email;
        }

        //User avatar : TODO

        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile Updated successfully",
        });
        
    } catch (error) {
        
        res.status(400).json({
            success: false,
            message: error.message,
        });

    }

}