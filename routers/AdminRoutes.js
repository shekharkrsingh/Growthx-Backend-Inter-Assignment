const express = require('express');
const { adminRegister, adminLogin, getAssignmentsByAdmin } = require('../controllers/adminControler');
const { adminAuthMiddleware } = require('../middleware/adminAuthMiddleware');
const { acceptAssignment, rejectAssignment } = require('../controllers/assignmentControler');

const router = express.Router();

// Admin routes
router.post("/register", adminRegister); // Register a new admin
router.post("/login", adminLogin); // Admin login

// Assignment routes, with authentication middleware
router.get("/assignments", adminAuthMiddleware, getAssignmentsByAdmin); // Get assignments assigned to the admin
router.post("/assignments/:id/accept", adminAuthMiddleware, acceptAssignment); // Accept an assignment
router.post("/assignments/:id/reject", adminAuthMiddleware, rejectAssignment); // Reject an assignment

module.exports = router;
