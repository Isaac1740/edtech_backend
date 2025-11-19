const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function (req, res, next) {
  try {
    // 1. Check if token exists
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    // Format: "Bearer token123"
    const token = header.split(' ')[1];

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Find user from DB
    const user = await User.findById(decoded.id).select('-passwordHash');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }

    // 4. Attach user to request (SUPER IMPORTANT)
    req.user = user;

    // 5. Continue to next middleware
    next();

  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized'
    });
  }
};
