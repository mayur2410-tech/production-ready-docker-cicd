const jwt = require('jsonwebtoken');

// Middleware function to authenticate user requests
const authenticateUser = (req, res, next) => {
    // 1. Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

    // 2. Check if the token exists
    if (!token) {
        return res.status(401).json({ message: "No token provided, authorization denied" });
    }

    try {
        // 3. Verify the token using JWT secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Attach the user ID from the token to the request object
        req.user = decoded;  
        // console.log("decoded token :",decoded)

        // 5. Move to the next middleware or route handler
        next();
    } catch (error) {
        // If token is invalid or expired, send an error response
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

// Export the middleware to use it in routes
module.exports = authenticateUser;
