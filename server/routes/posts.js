const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const upload = require('../middleware/upload'); // ✅ Multer middleware for image upload

// GET /api/posts - fetch all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
});

// GET /api/posts/:id - fetch single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch post' });
  }
});

// ✅ POST /api/posts - create a new post with optional image
router.post('/', upload.single('image'), async (req, res) => {
  const { title, content, author, category } = req.body; // renamed `categories` to `category` if you're using one

  try {
    const newPost = new Post({
      title,
      content,
      author,
      category,
      image: req.file ? `/uploads/${req.file.filename}` : '',
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error('❌ Error creating post:', err.message);
    res.status(500).json({ message: 'Failed to create post' });
  }
});

// PUT /api/posts/:id - update a post
router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update post' });
  }
});

// DELETE /api/posts/:id - delete a post
router.delete('/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete post' });
  }
});

module.exports = router;
