const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Assignment = require("../models/Assignment");

exports.adminRegister = async (req, res) => {
    try {
        const { firstName, lastName, email, password, adminId } = req.body;

        // Ensure all required fields are provided
        if (!firstName || !email || !password || !adminId) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Check if admin already exists by email or adminId
        const existingAdmin = await Admin.findOne({
            $or: [{ email }, { adminId }]
        });
        if (existingAdmin) {
            return res.status(409).json({ success: false, message: "Email or AdminId already in use." });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new admin
        const newAdmin = new Admin({ firstName, lastName, email, password: hashedPassword, adminId });
        await newAdmin.save();

        res.status(201).json({ success: true, message: "Admin registered successfully." });
    } catch (error) {
        console.error("Error during admin registration:", error.message);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Ensure email and password are provided
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required." });
        }

        // Find admin by email
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ success: false, message: "Admin not found." });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid credentials." });
        }

        // Generate JWT token
        const token = jwt.sign(
            { adminId: admin.adminId, email: admin.email, role: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // Send token as cookie
        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        }).status(200).json({ success: true, message: "Login successful." });
    } catch (error) {
        console.error("Error during admin login:", error.message);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find({}, 'firstName lastName adminId'); // Select only required fields

        if (!admins.length) {
            return res.status(404).json({ success: false, message: "No admins found." });
        }

        res.status(200).json({ success: true, admins });
    } catch (error) {
        console.error("Error fetching admins:", error.message);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

exports.getAssignmentsByAdmin = async (req, res) => {
    try {
        const adminId = req.admin.adminId;

        const assignments = await Assignment.find({ admin: adminId });

        if (assignments.length === 0) {
            return res.status(404).json({ success: false, message: "No assignments found for this admin." });
        }

        res.status(200).json({ success: true, assignments });
    } catch (error) {
        console.error("Error fetching assignments:", error.message);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};
