const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  filename: { type: String, required: true },
  originalname: { type: String },
  uploadDate: { type: Date, default: Date.now },
  data: { type: Object, required: true }, // Parsed SheetJS JSON data
});

module.exports = mongoose.model('File', FileSchema);