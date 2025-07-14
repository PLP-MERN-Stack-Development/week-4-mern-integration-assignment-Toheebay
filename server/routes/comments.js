const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// POST /api/comments/:postId - Add comment to a post
router.post('/:postId', async (req, res) => {
  const { postId } = req.params;
  const { author, content } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newComment = { author, content };

    post.comments.push(newComment);
    await post.save();

    res.status(201).json({
      message: 'Comment added successfully',
      comments: post.comments,
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
