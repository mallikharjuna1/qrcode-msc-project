const express = require('express');
const router = express.Router();
const Business = require('../models/Business');
const Feedback = require('../models/Feedback');


// GET /api/feedback/business/:businessId
router.get('/business/:businessId', async (req, res) => {
  try {
    const business = await Business.findById(req.params.businessId);
    if (!business) return res.status(404).json({ message: 'Business not found' });

    res.json({
      name: business.name,
      services: business.services
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

const NEGATIVE_KEYWORDS = ['bad', 'terrible', 'poor', 'worst', 'disappointed', 'awful', 'horrible', 'not good', 'very bad'];

function containsNegativeWords(comment) {
  if (!comment) return false;
  const lower = comment.toLowerCase();
  return NEGATIVE_KEYWORDS.some(word => lower.includes(word));
}

// POST /api/feedback/business/:businessId
router.post('/business/:businessId', async (req, res) => {
  const { serviceName, rating, comment } = req.body;

  try {

    const business = await Business.findById(req.params.businessId);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    const serviceExists = business.services.some(service => service.name === serviceName);
    if (!serviceExists) {
      return res.status(400).json({ message: 'Invalid service name for this business' });
    }

    const isFlagged = (rating <= 2 || containsNegativeWords(comment));


    let savedFeedback;


    savedFeedback = await Feedback.create({
      business: business._id,
      service: serviceName,
      rating,
      comment,
      isFlagged
    });

    res.status(200).json({
      message: 'Feedback submitted successfully',
      data: savedFeedback
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while submitting feedback' });
  }
});




module.exports = router;