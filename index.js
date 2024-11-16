const express = require("express");
const database = require('./config/database');
const cookieParser = require("cookie-parser");
const userRoutes = require("./routers/UserRoutes");
const adminRoutes = require("./routers/AdminRoutes");
const cors = require("cors");

require('dotenv').config();
const { PORT } = process.env;
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Connect to the database
database.connect();

// Routes
app.use("/", userRoutes); 
app.use("/admin", adminRoutes);

// Test route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: 'Server is up and running....'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
});
