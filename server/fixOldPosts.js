// fixOldPosts.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Post = require('./models/Post'); // Adjust path as needed

dotenv.config({ path: path.resolve(__dirname, '.env') });

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI not set in .env file');
  process.exit(1);
}

async function fixOldPosts() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const result = await Post.updateMany(
      { comments: { $exists: false } },
      { $set: { comments: [] } }
    );

    console.log(`🛠 Updated ${result.modifiedCount} post(s) to include comments array.`);
  } catch (err) {
    console.error('❌ Error updating posts:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

fixOldPosts();
