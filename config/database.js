const mongoose = require('mongoose');
require('dotenv').config();

exports.connect = async () => {
    try {
        // Connect to MongoDB using the URL from environment variables
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB connected successfully");
    } catch (error) {
        console.error("Issue in DB Connection:", error.message);
        process.exit(1); // Exit process with failure status
    }
};
