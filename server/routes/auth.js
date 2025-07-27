// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// @route POST /api/auth/register
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  try {
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ message: 'User already exists' });

    user = new User({ username, password, role: role === 'admin' ? 'admin' : 'user' });
    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: { username: user.username, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id);

    res.json({
      token,
      user: { username: user.username, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route POST /api/auth/forgot-password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body; // assuming username = email

  try {
    const user = await User.findOne({ username: email });
    if (!user) {
      // For security, respond with success anyway
      return res.status(200).json({ message: 'If this email exists, a reset link has been sent.' });
    }

    const resetToken = user.getResetPasswordToken();
    await user.save();

    // Construct reset URL
    const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;

    const message = `You requested a password reset. Please go to the following link to reset your password:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email.`;

    await sendEmail({
      email: user.username,
      subject: 'Password Reset Request',
      message,
    });

    res.status(200).json({ message: 'If this email exists, a reset link has been sent.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Email could not be sent.' });
  }
});

// @route POST /api/auth/reset-password/:resetToken
router.post('/reset-password/:resetToken', async (req, res) => {
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) return res.status(400).json({ message: 'Invalid or expired reset token' });

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;