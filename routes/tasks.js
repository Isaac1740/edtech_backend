const express = require('express');
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Task = require('../models/Task');
const User = require('../models/User');

const router = express.Router();

// Protect ALL routes with auth middleware
router.use(auth);

// ==========================================
// GET /tasks → Role-based task fetching
// ==========================================
router.get('/', async (req, res) => {
  try {
    const user = req.user;

    // STUDENT → only their tasks
    if (user.role === 'student') {
      const tasks = await Task.find({ userId: user._id })
        .populate("userId", "email role")
        .sort({ createdAt: -1 });
      
      return res.json({ success: true, tasks });
    }

    // TEACHER → their tasks + tasks of their students
    const students = await User.find({ teacherId: user._id }).select('_id');
    const studentIds = students.map(s => s._id);

    const tasks = await Task.find({
      $or: [
        { userId: user._id },
        { userId: { $in: studentIds } }
      ]
    })
      .populate("userId", "email role")
      .sort({ createdAt: -1 });

    return res.json({ success: true, tasks });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// ==========================================
// POST /tasks → Create a task
// ==========================================
router.post(
  '/',
  body('title').notEmpty().withMessage('Title is required'),

  async (req, res) => {
    try {
      const user = req.user;

      // validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: errors.array()[0].msg,
        });
      }

      const { title, description, dueDate } = req.body;

      const task = new Task({
        userId: user._id,
        title,
        description,
        dueDate
      });

      await task.save();

      return res.json({
        success: true,
        message: 'Task created',
        task
      });

    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  }
);
// ==========================================
// PUT /tasks/:id → Update a task
// ==========================================
router.put('/:id', async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Only owner can update
    if (task.userId.toString() !== user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not allowed'
      });
    }

    const { title, description, dueDate, progress } = req.body;

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (dueDate !== undefined) task.dueDate = dueDate;
    if (progress !== undefined) task.progress = progress;

    await task.save();

    return res.json({
      success: true,
      message: 'Task updated',
      task
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});
// ==========================================
// DELETE /tasks/:id → Delete a task
// ==========================================
router.delete('/:id', async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Only owner can delete
    if (task.userId.toString() !== user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not allowed'
      });
    }

    await task.deleteOne();

    return res.json({
      success: true,
      message: 'Task deleted'
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});



module.exports = router;
