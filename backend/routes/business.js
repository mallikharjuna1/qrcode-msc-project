const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const Business = require('../models/Business');
const { protect } = require('../middlewares/auth');
const Feedback = require('../models/Feedback');
const fs = require('fs');


// GET current business services
router.get('/services', protect, async (req, res) => {
  try {
    const business = await Business.findById(req.business._id);
    res.json({ services: business.services });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch services' });
  }
});

router.post('/feedbacks', protect, async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ business: req.business._id });
    res.status(201).json({ feedbacks });
  }
  catch (err) {
    res.status(500).json({ message: "Failed to fetch feedbacks" });
  }
});

// POST add new service
const dir = './uploads/services';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

router.post('/services', protect, upload.single('image'), async (req, res) => {
  const { name, description, price } = req.body;
  const image = req.file?.filename;

  if (!name || !description || !price || !image) {
    return res.status(400).json({ message: 'Name, Price, description, and image are required' });
  }

  try {
    const business = await Business.findById(req.business._id);
    business.services.push({
      name,
      price,
      description,
      image: `/uploads/services/${image}`,
    });
    await business.save();

    res.status(201).json({ message: 'Service added' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add service' });
  }
});

router.put('/services/:serviceId', protect, upload.single('image'), async (req, res) => {
  const { name, description, price } = req.body;
  const { serviceId } = req.params;

  try {
    const business = await Business.findById(req.business._id);

    const service = business.services.id(serviceId);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    if (name) service.name = name;
    if (price) service.price = price;
    if (description) service.description = description;
    if (req.file) {
      service.image = `/uploads/services/${req.file.filename}`;
    }

    await business.save();
    res.json({ message: 'Service updated successfully' });
  } catch (err) {
    console.error('Update service error:', err);
    res.status(500).json({ message: 'Failed to update service' });
  }
});

// DELETE /api/business/services/:serviceId
router.delete('/services/:serviceId', protect, async (req, res) => {
  const { serviceId } = req.params;

  try {
    const business = await Business.findById(req.business._id);
    const service = business.services.id(serviceId);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    service.deleteOne();
    await business.save();

    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    console.error('Delete service error:', err);
    res.status(500).json({ message: 'Failed to delete service' });
  }
});


module.exports = router;
