const mongoose = require('mongoose');

const AnalysisSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  file: { type: mongoose.Schema.Types.ObjectId, ref: 'File', required: true },
  xColumn: { type: String, required: true },
  yColumn: { type: String, required: true },
  chartType: { type: String, enum: ['2d', '3d'], default: '2d' },
  createdAt: { type: Date, default: Date.now },
  insights: { type: String }, // AI-generated insights optional
});

module.exports = mongoose.model('Analysis', AnalysisSchema);