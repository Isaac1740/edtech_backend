const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect db
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("DB error:", err));

// routes
app.use('/auth', require('./routes/auth'));
app.use('/tasks', require('./routes/tasks'));
app.use('/teachers', require('./routes/teachers'));

// start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
