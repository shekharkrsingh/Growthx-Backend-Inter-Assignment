const jwt = require("jsonwebtoken");

exports.userAuthMiddleware = (req, res, next) => {
    const token = req.cookies.authToken;
    
    // Check if token is provided
    if (!token) {
        return res
            .status(401)
            .json({ success: false, message: "Unauthorized access." });
    }

    try {
        // Verify the token and decode it
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Ensure the user has the correct role
        if (decoded.role !== "user") {
            return res
                .status(403)
                .json({ success: false, message: "Access denied. Invalid role." });
        }

        // Attach decoded user data to request for further use
        req.user = decoded;
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        // Handle token errors (invalid/expired)
        res
            .status(403)
            .json({ success: false, message: "Invalid or expired token." });
    }
};
