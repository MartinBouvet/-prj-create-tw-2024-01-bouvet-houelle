const express = require('express');
const router = express.Router();
const Sensor = require('../models/Sensor');

// Get all sensors
router.get('/', async (req, res) => {
  try {
    const sensors = await Sensor.find().populate('userID');
    res.json(sensors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get sensor by ID
router.get('/:id', async (req, res) => {
  try {
    const sensor = await Sensor.findById(req.params.id).populate('userID');
    if (!sensor) return res.status(404).json({ message: 'Sensor not found' });
    res.json(sensor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get sensors by user ID
router.get('/user/:userId', async (req, res) => {
  try {
    const sensors = await Sensor.find({ userID: req.params.userId });
    res.json(sensors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new sensor
router.post('/', async (req, res) => {
  const sensor = new Sensor({
    creationDate: req.body.creationDate,
    location: req.body.location,
    userID: req.body.userID
  });

  try {
    const newSensor = await sensor.save();
    res.status(201).json(newSensor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update sensor
router.put('/:id', async (req, res) => {
  try {
    const updatedSensor = await Sensor.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    res.json(updatedSensor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete sensor
router.delete('/:id', async (req, res) => {
  try {
    await Sensor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Sensor deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;