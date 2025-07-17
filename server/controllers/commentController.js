const Comment = require('../models/Comment');

// POST /api/comments/:postId
exports.addComment = async (req, res) => {
  try {
    const newComment = new Comment({
      postId: req.params.postId,
      author: req.body.author || 'Anonymous',
      content: req.body.content,
    });
    const saved = await newComment.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('❌ Error adding comment:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/comments/:postId
exports.getCommentsByPostId = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    console.error('❌ Error fetching comments:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/comments/:commentId
exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    comment.content = req.body.content || comment.content;
    const updated = await comment.save();
    res.json(updated);
  } catch (err) {
    console.error('❌ Error updating comment:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/comments/:commentId
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    console.error('❌ Error deleting comment:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/comments/:commentId/like
exports.likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    comment.likes = (comment.likes || 0) + 1;
    const updated = await comment.save();
    res.json(updated);
  } catch (err) {
    console.error('❌ Error liking comment:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
