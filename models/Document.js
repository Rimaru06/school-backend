const mongoose = require('mongoose');
const documentSchema = new mongoose.Schema({
  title: String,
  fileUrl: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Document', documentSchema);