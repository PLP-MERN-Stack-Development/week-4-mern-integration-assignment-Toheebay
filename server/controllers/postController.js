// controllers/postController.js

const Post = require('../models/Post');

exports.getPosts = async (req, res) => {
  const posts = await Post.find();
  res.status(200).json(posts);
};

exports.getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.status(200).json(post);
};

exports.createPost = async (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required.' });
  }

  const newPost = new Post({ title, content, author });
  const savedPost = await newPost.save();
  res.status(201).json(savedPost);
};
