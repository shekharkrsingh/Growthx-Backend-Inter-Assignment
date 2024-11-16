const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/  
    },
    userId:{
        type:String,
        required:true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true 
});

module.exports = mongoose.model('UserProfile', userProfileSchema);
