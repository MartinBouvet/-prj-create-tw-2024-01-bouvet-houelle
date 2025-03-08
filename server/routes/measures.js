const express = require('express');
const router = express.Router();
const Measure = require('../models/Measure');

// Get all measures
router.get('/', async (req, res) => {
  try {
    const measures = await Measure.find().populate({
      path: 'sensorID',
      populate: { path: 'userID' }
    });
    res.json(measures);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get measure by ID
router.get('/:id', async (req, res) => {
  try {
    const measure = await Measure.findById(req.params.id).populate({
      path: 'sensorID',
      populate: { path: 'userID' }
    });
    if (!measure) return res.status(404).json({ message: 'Measure not found' });
    res.json(measure);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get measures by sensor ID
router.get('/sensor/:sensorId', async (req, res) => {
  try {
    const measures = await Measure.find({ sensorID: req.params.sensorId });
    res.json(measures);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get measures by type
router.get('/type/:type', async (req, res) => {
  try {
    const measures = await Measure.find({ type: req.params.type });
    res.json(measures);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Aggregation endpoints for dashboard
router.get('/stats/by-type', async (req, res) => {
  try {
    const stats = await Measure.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          avgValue: { $avg: '$value' },
          minValue: { $min: '$value' },
          maxValue: { $max: '$value' }
        }
      }
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/stats/recent', async (req, res) => {
  try {
    const recentMeasures = await Measure.find()
      .sort({ creationDate: -1 })
      .limit(50)
      .populate({
        path: 'sensorID',
        populate: { path: 'userID' }
      });
    res.json(recentMeasures);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new measure
router.post('/', async (req, res) => {
  const measure = new Measure({
    type: req.body.type,
    creationDate: req.body.creationDate,
    sensorID: req.body.sensorID,
    value: req.body.value
  });

  try {
    const newMeasure = await measure.save();
    res.status(201).json(newMeasure);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update measure
router.put('/:id', async (req, res) => {
  try {
    const updatedMeasure = await Measure.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    res.json(updatedMeasure);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete measure
router.delete('/:id', async (req, res) => {
  try {
    await Measure.findByIdAndDelete(req.params.id);
    res.json({ message: 'Measure deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;