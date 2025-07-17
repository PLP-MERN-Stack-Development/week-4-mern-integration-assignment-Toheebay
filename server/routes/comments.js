const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// GET /api/comments/:postId
router.get('/:postId', async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await Comment.find({ postId });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching comments' });
  }
});

module.exports = router;
