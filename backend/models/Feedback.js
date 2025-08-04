const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true
    },
    service: String,
    rating: Number,
    comment: String,
    isFlagged: { type: Boolean, default: false },
    sentiment: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
