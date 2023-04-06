const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
        require: true
    },
    isAdmin: {
        type: Boolean,
        require: true
    },
    // include the array of ids of all comments in this post schema itself
    review: [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, {
    timestamps: true
});


const User = mongoose.model('User', userSchema);
module.exports = User;