const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: String,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  categories: [String],
  likes: {
    type: Number,
    default: 0,
  },
  comments: [commentSchema],
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
