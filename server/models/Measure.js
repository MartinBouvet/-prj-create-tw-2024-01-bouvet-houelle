const mongoose = require('mongoose');

const MeasureSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['temperature', 'humidity', 'airPollution']
  },
  creationDate: {
    type: Date,
    required: true
  },
  sensorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sensor',
    required: true
  },
  value: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Measure', MeasureSchema);