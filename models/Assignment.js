const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    task: {
        type: String,
        required: true
    },
    admin: {
        type: String,
        required: true
    },
    accepted: {
        type: Boolean,
        default: false 
    },
    rejected: {
        type: Boolean,
        default: false 
    }
});

module.exports = mongoose.model("Assignment", assignmentSchema);
