const mongoose = require('mongoose');
const slugify = require('slugify');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    author: {
      type: String,
      default: 'Anonymous',
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      sparse: true,
    },
    category: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },

    // ✅ Embedded comments
    comments: [
      {
        author: { type: String, default: 'Anonymous' },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

postSchema.pre('save', function (next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Post', postSchema);
