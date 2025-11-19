const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher'], required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } //only for students login
});

module.exports = mongoose.model('User', UserSchema);
