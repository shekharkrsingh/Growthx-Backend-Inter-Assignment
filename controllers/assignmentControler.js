const Assignment = require("../models/Assignment");
const User = require("../models/User");
const Admin = require("../models/Admin");

exports.uploadAssignment = async (req, res) => {
    try {
        const { task, admin } = req.body;
        const userId = req.user.userId;

        // Check if task and admin are provided
        if (!task || !admin) {
            return res.status(400).json({ success: false, message: "Task and Admin are required." });
        }

        // Verify that the user exists
        const userExists = await User.findOne({ userId });
        if (!userExists) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Verify that the admin exists
        const adminExists = await Admin.findOne({ adminId: admin });
        if (!adminExists) {
            return res.status(404).json({ success: false, message: "Admin not found." });
        }

        // Create a new assignment and save it
        const newAssignment = new Assignment({ userId, task, admin });
        await newAssignment.save();

        res.status(201).json({ success: true, message: "Assignment uploaded successfully.", assignment: newAssignment });
    } catch (error) {
        console.error("Error uploading assignment:", error.message);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

exports.acceptAssignment = async (req, res) => {
    try {
        const { id } = req.params;
        const adminId = req.admin.adminId;

        // Find the assignment by ID
        const assignment = await Assignment.findById(id);
        if (!assignment) {
            return res.status(404).json({ success: false, message: "Assignment not found." });
        }

        // Ensure that the admin can accept this assignment
        if (assignment.admin !== adminId) {
            return res.status(403).json({ success: false, message: "You are not authorized to accept this assignment." });
        }

        // Update the assignment status to accepted
        assignment.accepted = true;
        assignment.rejected = false;
        await assignment.save();

        res.status(200).json({
            success: true,
            message: "Assignment accepted successfully.",
            assignment
        });
    } catch (error) {
        console.error("Error accepting assignment:", error.message);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

exports.rejectAssignment = async (req, res) => {
    try {
        const { id } = req.params;
        const adminId = req.admin.adminId;

        // Find the assignment by ID
        const assignment = await Assignment.findById(id);
        if (!assignment) {
            return res.status(404).json({ success: false, message: "Assignment not found." });
        }

        // Ensure that the admin can reject this assignment
        if (assignment.admin !== adminId) {
            return res.status(403).json({ success: false, message: "You are not authorized to reject this assignment." });
        }

        // Update the assignment status to rejected
        assignment.rejected = true;
        assignment.accepted = false;
        await assignment.save();

        res.status(200).json({
            success: true,
            message: "Assignment rejected successfully.",
            assignment
        });
    } catch (error) {
        console.error("Error rejecting assignment:", error.message);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};
