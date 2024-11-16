const jwt = require("jsonwebtoken");

exports.adminAuthMiddleware = (req, res, next) => {
    const token = req.cookies.authToken;

    // Check if token is provided
    if (!token) {
        return res
            .status(401)
            .json({ success: false, message: "Unauthorized access. No token provided." });
    }

    try {
        // Verify the token and decode it
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Ensure the user has admin role
        if (decoded.role !== "admin") {
            return res
                .status(403)
                .json({ success: false, message: "Forbidden. Admin access only." });
        }

        // Attach decoded admin data to request for further use
        req.admin = decoded;
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        // Handle token errors (invalid/expired)
        console.error("Error during token verification:", error.message);
        res
            .status(403)
            .json({ success: false, message: "Invalid or expired token." });
    }
};
