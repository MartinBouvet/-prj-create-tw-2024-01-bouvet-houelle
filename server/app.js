const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const userRoutes = require('./routes/users');
const sensorRoutes = require('./routes/sensors');
const measureRoutes = require('./routes/measures');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/sensors', sensorRoutes);
app.use('/api/measures', measureRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });