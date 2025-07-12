// routes/comments.js

const express = require('express');
const Comment = require('../models/Comment');
const router = express.Router();

// Get all comments for a specific post
router.get('/post/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({ createdAt: 1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new comment
router.post('/', async (req, res) => {
  const { postId, author, content } = req.body;

  if (!postId || !author || !content) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newComment = new Comment({ postId, author, content });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
