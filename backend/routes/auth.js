const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

const authenticateToken = (req, res, next) => {
  try {
    // Get the token from the authorization header
    const authHeader = req.header("authorization");
    const token = authHeader && authHeader.split(" ")[1];

    // Check if the token is present
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication token is required" });
    }

    // Verify the token
    jwt.verify(token, "tcmTM", (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }

      // Attach user information to the request object
      req.user = user;
      next();
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { authenticateToken };
