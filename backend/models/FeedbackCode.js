
const mongoose = require('mongoose');

const FeedbackCodeSchema = new mongoose.Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, required: true },
  email: { type: String, required: true },
  code: { type: String, required: true },
  expiresAt: { type: Date, required: true }
});

module.exports = mongoose.model('FeedbackCode', FeedbackCodeSchema);
