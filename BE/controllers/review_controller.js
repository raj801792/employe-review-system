const { model } = require('mongoose');
const Review = require('../models/Review');
const User = require('../models/User');

module.exports.create = async function (req, res) {

    try {
        //find user id in User Collection 
        let user = await User.findById(req.params.id);

        //if the user are find
        if (user) {
            let reviews = await Review.create({
                content: req.body.content,
                user: req.user.id,
                userId: req.body.userId
            });

            //fetch id of review from Review collection and push it review array which is present in user collection
            user.review.push(reviews);
            user.save();

            return res.status(200).json({ success: 'reviewsend in database' });
            //req.flash('success', 'reviewpublished!');

            //res.redirect('/');
        }
        //if the user are not find
        else {
            return res.status(400).json({ errors: 'user not exist' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }

}


module.exports.destroy = async function (req, res) {

    try {
        //find review id in review 
        let review = await Review.findById(req.params.id);
        let user = await User.findById(req.user.id);
        //console.log(review);

        //if request user id and the review user id are same
        if (review.user == req.user.id || user.isAdmin === true) {

            //save user id in a variable
            let userId = review.userId;
            console.log(userId);
            //delete review in Review 
            const query = { id: req.params.id };
            await review.deleteOne(query);

            //find user id in User collection move to review array and delete 
            let user = await User.findByIdAndUpdate(userId, { $pull: { review: req.params.id } });

            return res.status(200).json({ success: 'review delete successfully' });
            //req.flash('success', 'reviewdeleted!');

            //return res.redirect('back');
        } else {
            return res.status(404).json({ errors: 'user not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }

}

module.exports.update = async function (req, res) {

    try {
        const { content } = req.body;
        let user = await User.findById(req.user.id);

        // Create a newContent object    
        const newContent = {};
        if (content) { newContent.content = content };

        // Find the note to be updated and update it
        let review = await Review.findById(req.params.id);
        //if review id are not find in Review
        if (!review) { return res.status(404).send("Not Found") }

        if (review.user.toString() !== req.user.id && user.isAdmin === false) {
            return res.status(401).send("Not Allowed");
        }

        review = await Review.findByIdAndUpdate(req.params.id, { $set: newContent }, { new: true })
        res.status(200).json({ review });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}