const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');
const { protect } = require('../middlewares/auth');

// @route    GET /api/qr
// @desc     Generate QR code for logged-in business
// @access   Private
router.get('/', protect, async (req, res) => {
  try {
    const businessId = req.business._id;
    const feedbackUrl = `http://localhost:3000/feedback/${businessId}`; 

    const qrCodeImage = await QRCode.toDataURL(feedbackUrl); 

    res.status(200).json({
      success: true,
      feedbackUrl,
      qrCodeImage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to generate QR code' });
  }
});

module.exports = router;
