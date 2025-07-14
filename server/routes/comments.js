// routes/comments.js
const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// POST /api/comments
router.post('/', async (req, res) => {
  const { postId, author, content } = req.body;

  if (!postId || !author || !content) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const comment = new Comment({ postId, author, content });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/comments?postId=...
router.get('/', async (req, res) => {
  const { postId } = req.query;

  if (!postId) {
    return res.status(400).json({ message: 'postId is required' });
  }

  try {
    const comments = await Comment.find({ postId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
