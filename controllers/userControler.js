const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.userRegister = async (req, res) => {
    try {
        const { firstName, lastName, email, password, userId } = req.body;

        // Validate that all required fields are provided
        if (!firstName || !email || !password || !userId) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required." });
        }

        // Check if the email is already registered
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res
                .status(409)
                .json({ success: false, message: "Email is already registered." });
        }

        // Check if the userId is already taken
        const existingUserId = await User.findOne({ userId });
        if (existingUserId) {
            return res
                .status(409)
                .json({ success: false, message: "UserId is already in use." });
        }

        // Hash the user's password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user and save it to the database
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            userId
        });

        await newUser.save();

        // Respond with a success message
        res
            .status(201)
            .json({ success: true, message: "User registered successfully." });
    } catch (error) {
        console.error("Error during signup:", error);
        res
            .status(500)
            .json({ success: false, message: "Internal server error." });
    }
};

exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate that email and password are provided
        if (!email || !password) {
            return res
                .status(400)
                .json({ success: false, message: "Email and password are required." });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found." });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid credentials." });
        }

        // Generate a JWT token for the user
        const token = jwt.sign(
            { userId: user.userId, email: user.email, role:"user" },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Set the token in a cookie
        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3600000 // 1 hour expiration
        });

        // Respond with a success message
        res
            .status(200)
            .json({ success: true, message: "Login successful." });
    } catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Internal server error." });
    }
};
