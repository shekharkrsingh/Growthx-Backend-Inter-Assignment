const mongoose = require('mongoose');

const adminProfileSchema = new mongoose.Schema({
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
    adminId:{
        type:String,
        required:true,
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true 
});

module.exports = mongoose.model('AdminProfile', adminProfileSchema);
