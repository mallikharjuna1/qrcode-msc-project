const express = require('express');
const PDFDocument = require('pdfkit');
const moment = require('moment');
const Feedback = require('../models/Feedback');
const Business = require('../models/Business');
const { protect } = require('../middlewares/auth');

const router = express.Router();

// @route GET /api/reports/export?start=2025-07-01&end=2025-07-19
// @desc Export feedback report for business
// @access Private
router.get('/export', protect, async (req, res) => {
  try {
  
    const { start, end , businessId} = req.query;

    const startDate = new Date(start);
    const endDate = new Date(end);
    endDate.setHours(23, 59, 59, 999); 



    const business = await Business.findById(businessId);
    const feedbacks = await Feedback.find({
      business: businessId,
      createdAt: { $gte: startDate, $lte: endDate }
    }).sort({ createdAt: -1 });

 

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=report-${Date.now()}.pdf`);
   
    doc.pipe(res);

    // Title
    doc.fontSize(20).text('Feedback Report', { align: 'center' }).moveDown(1.5);

    // Business Info
    doc.fontSize(14).text(`Business Name: ${business.name}`);
    doc.text(`Email: ${business.email}`);
    doc.text(`Report From: ${moment(startDate).format('LL')} To: ${moment(endDate).format('LL')}`);
    doc.moveDown();

    // Services/Products
    doc.fontSize(16).text('Services / Products', { underline: true }).moveDown(0.5);
    if (business.services.length === 0) {
      doc.fontSize(12).text('No services listed.').moveDown();
    } else {
      business.services.forEach((s, i) => {
        doc.fontSize(12).text(`${i + 1}. ${s.name} - ${s.description}`);
      });
      doc.moveDown();
    }

    // Feedback
    doc.fontSize(16).text('Feedbacks', { underline: true }).moveDown(0.5);
    if (feedbacks.length === 0) {
      doc.text('No feedbacks found for this period.');
    } else {
      feedbacks.forEach((f, i) => {
        doc.fontSize(12).text(`${i + 1}. Date: ${moment(f.createdAt).format('LLL')}`);
        doc.text(`   Service: ${f.service}`);
        doc.text(`   Rating: ${f.rating}/5`);
        doc.text(`   Comment: ${f.comment}`).moveDown();
      });
    }

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to export PDF' });
  }
});

module.exports = router;
