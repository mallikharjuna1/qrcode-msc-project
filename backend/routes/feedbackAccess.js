const express = require('express');
const router = express.Router();
const FeedbackCode = require('../models/FeedbackCode');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// send code to email
router.post('/feedback-request', async (req, res) => {
  const { email, businessId } = req.body;

  if (!email || !businessId) return res.status(400).json({ success: false, message: 'Missing data' });

  try {
    const code = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); 

    await FeedbackCode.deleteMany({ email, businessId }); 

    await FeedbackCode.create({ businessId, email, code, expiresAt });

    // send email using nodemailer from my email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'thallapallimallikharjuna@gmail.com',
        pass: 'fymdynaunyevtgpn',
      },
    });

    await transporter.sendMail({
      from: '"Feedback Bot" <thallapallimallikharjuna@gmail.com>',
      to: email,
      subject: 'Your Feedback Code',
      text: `Your one-time feedback code is: ${code}`,
    });

    res.json({ success: true, message: 'Code sent to email' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to send code' });
  }
});

// verify code and allow access
router.post('/verify-code', async (req, res) => {
  const { email, businessId, code } = req.body;

  if (!email || !businessId || !code) return res.status(400).json({ success: false });

  try {
    const record = await FeedbackCode.findOne({ email, businessId, code });

    if (!record || record.expiresAt < new Date()) {
      return res.status(400).json({ success: false, message: 'Invalid or expired code' });
    }

    await FeedbackCode.deleteOne({ _id: record._id });

    res.json({ success: true, message: 'Code verified' });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

module.exports = router;
