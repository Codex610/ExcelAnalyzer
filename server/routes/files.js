const express = require('express');
const router = express.Router();
const multer = require('multer');
const XLSX = require('xlsx');
const path = require('path');
const { protect } = require('../middleware/auth');
const File = require('../models/File');

// Multer config (store in memory for parsing)
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext !== '.xls' && ext !== '.xlsx') {
    return cb(new Error('Only .xls and .xlsx files are allowed'));
  }
  cb(null, true);
};
const upload = multer({ storage, fileFilter });

// Upload and parse excel
router.post('/upload', protect, upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  try {
    // Parse XLSX buffer using SheetJS
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { defval: null }); // defval fixes empty cells

    // Save file metadata and parsed data in DB
    const fileDoc = new File({
      user: req.user._id,
      filename: req.file.filename || '',
      originalname: req.file.originalname,
      data
    });
    await fileDoc.save();

    res.json({ fileId: fileDoc._id, data });
  } catch (error) {
    res.status(500).json({ message: 'Error processing Excel file' });
  }
});

// Get user files and history
router.get('/myfiles', protect, async (req, res) => {
  try {
    const files = await File.find({ user: req.user._id }).sort({ uploadDate: -1 });
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;