const User = require('../models/User');




module.exports.home = async function(req, res){

    try {
        //fetch all user data except pasword, phone no from User collection
        let user = await User.find({}).select("-password ");
        res.status(200).json(user);
        
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
   
}