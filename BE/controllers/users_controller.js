const User = require('../models/User');
const Review = require('../models/Review');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'employe@review01';

// for sign in 
module.exports.signIn = async function (req, res) {

    //if validation error are occure
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //destructcharing email and password from req.body
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        //if email id are not find
        if (!user) {
            return res.status(400).json({ errors: 'enter the valid cradentioal' });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        //if password are not match
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }


        //set data and signature in jwt token
        const data = {
            user: {
                id: user.id
                
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        let admin = user.isAdmin;

        //return status and authentication token
        return res.status(200).json({ authtoken, admin });
        //return res.status(200).redirect('/profile');

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}

// create a new user
module.exports.create = async function (req, res) {

    //if validation error are occure
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        //scarching email in database 
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ errors: 'email alredy exist' });
        }

        //creat salt and generate hasing of password
        let salt = await bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        //Creat a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
            phoneNo: req.body.phoneNo,
            isAdmin: false
        })

        //set data and signature in jwt token
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);

        //return status and authentication token
        //return res.status(200).json({ authtoken });
        return res.status(200).json({ user });
    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

}

//for get the user
module.exports.getuser = async function (req, res) {

    try {
        //geting user id from the token which is pass in the header
        //userId = req.user.id;
        //find the id in User collection and geting details except password, phone no
        //const user = await User.findById(userId).select("-password -phoneNo");
        let user = await User.findById(req.params.id);
        if (user) {
            const userDetails = await User.findById(req.params.id, "name review").populate([{
                path: "review",
                populate: {
                    path: "user",
                    select: "name",
                }
            },

            ]);
            //send the user details except password
            res.send(userDetails);
            //console.log(userDetails.review[0].content);
        }
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}

module.exports.destroy = async function (req, res) {

    try {
        let user = await User.findById(req.params.id);
        let adminUser = await User.findById(req.user.id);

        if (user.id == req.user.id || adminUser.isAdmin === true) {
            const query = { id: req.params.id };
            await user.deleteOne(query);

            await Review.deleteMany({ user: req.params.id });

            //req.flash('success', 'Post and associated comments deleted!');
            return res.status(200).json({ success: 'user deleted successfully' });
            //return res.redirect('back');
        } else {
            // req.flash('error', 'You cannot delete this post!');
            // return res.redirect('back');
            return res.status(404).json({ errors: 'not found' });
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

}

module.exports.update = async function (req, res) {

    try {
        const { name, phoneNo, isAdmin } = req.body;
        let adminUser = await User.findById(req.user.id);

        // Create a newContent object    
        const newUser = {};
        if (name) { newUser.name = name };
        if (phoneNo) { newUser.phoneNo = phoneNo };
        if (isAdmin) { newUser.isAdmin = isAdmin };

        let user = await User.findById(req.params.id);

        if (!user) { return res.status(404).send("Not Found") }
        if (adminUser.isAdmin === false) { return res.status(401).send("Not Allowed"); }

        user = await User.findByIdAndUpdate(req.params.id, { $set: newUser }, { new: true })
        res.status(200).json({ user });
    } catch (error) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
}
