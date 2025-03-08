const mongoose = require('mongoose');

const SensorSchema = new mongoose.Schema({
  creationDate: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true,
    enum: ['bedroom', 'livingroom', 'bathroom', 'entrance']
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Sensor', SensorSchema);