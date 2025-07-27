const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const User = require('../models/User');
const File = require('../models/File');
const Analysis = require('../models/Analysis');

// Get statistics (upload counts, user counts, etc)
router.get('/stats', protect, admin, async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const fileCount = await File.countDocuments();
    const analysisCount = await Analysis.countDocuments();

    res.json({ userCount, fileCount, analysisCount });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get list of users
router.get('/users', protect, admin, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete user by ID
router.delete('/users/:id', protect, admin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    // Optionally delete files and analyses for this user
    await File.deleteMany({ user: req.params.id });
    await Analysis.deleteMany({ user: req.params.id });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;