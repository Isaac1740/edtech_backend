const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  progress: { 
    type: String, 
    enum: ['not-started', 'in-progress', 'completed'], 
    default: 'not-started'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', TaskSchema);
