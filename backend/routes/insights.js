const express = require('express');
const router = express.Router();
const processFlaggedFeedbacks = require('../utils/summarizer');
const { protect } = require('../middlewares/auth');

router.get('/summary', protect, async (req, res) => {

  try {
  
    processFlaggedFeedbacks();

    res.json({  });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Something went wrong' });
  }
});

module.exports = router;
