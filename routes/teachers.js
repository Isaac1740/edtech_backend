const router = require("express").Router();
const User = require("../models/User");

// Get all teachers
router.get("/", async (req, res) => {
  try {
    const teachers = await User.find({ role: "teacher" }).select("_id email");
    res.json({ success: true, teachers });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
