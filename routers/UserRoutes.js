const express = require('express');
const { getAllAdmins } = require('../controllers/adminControler');
const { userAuthMiddleware } = require('../middleware/userAuthMiddleware');
const { userRegister, userLogin } = require('../controllers/userControler');
const { uploadAssignment } = require('../controllers/assignmentControler');

const router = express.Router();

// User routes
router.post("/register", userRegister); // Register a new user
router.post("/login", userLogin); // User login

// Assignment routes, with authentication middleware
router.post("/upload", userAuthMiddleware, uploadAssignment); // Upload an assignment (authentication required)

// Admin routes
router.get("/admins", getAllAdmins); // Get all admin details

module.exports = router;
