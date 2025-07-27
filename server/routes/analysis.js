const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Analysis = require('../models/Analysis');
const File = require('../models/File');

// Save an analysis for user
router.post('/', protect, async (req, res) => {
  const { fileId, xColumn, yColumn, chartType, insights } = req.body;
  try {
    const file = await File.findOne({ _id: fileId, user: req.user._id });
    if (!file) return res.status(404).json({ message: 'File not found' });

    const analysis = new Analysis({
      user: req.user._id,
      file: fileId,
      xColumn,
      yColumn,
      chartType,
      insights
    });
    await analysis.save();
    res.status(201).json(analysis);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's analysis history
router.get('/my', protect, async (req, res) => {
  try {
    const analyses = await Analysis.find({ user: req.user._id })
      .populate('file', 'originalname uploadDate')
      .sort({ createdAt: -1 });
    res.json(analyses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;