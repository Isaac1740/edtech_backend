const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// =============================
// SIGNUP
// =============================
router.post(
  '/signup',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('role').isIn(['student', 'teacher']),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: errors.array()[0].msg,
        });
      }

      const { email, password, role, teacherId } = req.body;

      // Students must have a teacher
      if (role === 'student' && !teacherId) {
        return res.status(400).json({
          success: false,
          message: 'Students must have a teacherId',
        });
      }

      // Check existing email
      const existing = await User.findOne({ email });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use',
        });
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const user = new User({
        email,
        passwordHash,
        role,
        teacherId: role === 'student' ? teacherId : null,
      });

      await user.save();

      // Create token with role + teacherId
      const token = jwt.sign(
        {
          id: user._id,
          role: user.role,
          teacherId: user.teacherId || null
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.json({
        success: true,
        message: 'User created successfully',
        token,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
          teacherId: user.teacherId || null
        }
      });

    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

// =============================
// LOGIN
// =============================
router.post(
  '/login',
  body('email').isEmail(),
  body('password').exists(),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: errors.array()[0].msg,
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email or password',
        });
      }

      const match = await bcrypt.compare(password, user.passwordHash);
      if (!match) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email or password',
        });
      }

      // FIXED: Token now includes role
      const token = jwt.sign(
        {
          id: user._id,
          role: user.role,
          teacherId: user.teacherId || null
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
          teacherId: user.teacherId || null
        }
      });

    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

module.exports = router;
