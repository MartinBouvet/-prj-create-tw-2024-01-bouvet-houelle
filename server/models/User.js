const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  personsInHouse: {
    type: Number,
    required: true
  },
  houseSize: {
    type: String,
    required: true,
    enum: ['small', 'medium', 'big']
  }
});

module.exports = mongoose.model('User', UserSchema);