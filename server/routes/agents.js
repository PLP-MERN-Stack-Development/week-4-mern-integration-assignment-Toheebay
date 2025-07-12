// server/routes/agents.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const Agent = require('../models/Agent');

const router = express.Router();

// 🧾 Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // relative to root
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// ✅ GET all active subscribed agents
router.get('/', async (req, res) => {
  try {
    const now = new Date();
    const agents = await Agent.find({
      subscriptionEnd: { $gte: now } // still active
    });
    res.status(200).json(agents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST create new agent with optional image
router.post('/', upload.single('image'), async (req, res) => {
  const {
    name,
    email,
    subscriptionType,
    companyName,
    whatsapp,
    website
  } = req.body;

  const now = new Date();
  let subscriptionEnd = null;

  if (subscriptionType === 'monthly') {
    subscriptionEnd = new Date(now.setMonth(now.getMonth() + 1));
  } else if (subscriptionType === 'yearly') {
    subscriptionEnd = new Date(now.setFullYear(now.getFullYear() + 1));
  }

  try {
    const newAgent = new Agent({
      name,
      email,
      subscriptionType,
      companyName,
      whatsapp,
      website,
      image: req.file?.filename || null,
      subscriptionStart: new Date(),
      subscriptionEnd
    });

    await newAgent.save();
    res.status(201).json(newAgent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ PUT to update agent subscription
router.put('/:id/subscribe', async (req, res) => {
  const { subscriptionType } = req.body;
  const now = new Date();
  let subscriptionEnd = null;

  if (subscriptionType === 'monthly') {
    subscriptionEnd = new Date(now.setMonth(now.getMonth() + 1));
  } else if (subscriptionType === 'yearly') {
    subscriptionEnd = new Date(now.setFullYear(now.getFullYear() + 1));
  }

  try {
    const updated = await Agent.findByIdAndUpdate(
      req.params.id,
      {
        subscriptionType,
        subscriptionStart: new Date(),
        subscriptionEnd
      },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
