// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ✅ Enhanced CORS Middleware with dynamic origin check
const allowedOrigins = [
  'http://localhost:3000',                 // Local development
  'https://pilgrimsblog.netlify.app',      // Deployed Netlify frontend
  // Add more allowed domains if needed
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('❌ CORS Not Allowed for this origin: ' + origin));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware for JSON & Form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads (images, etc.)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const postRoutes = require('./routes/posts');
app.use('/api/posts', postRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('🚀 API is running');
});

// Connect to MongoDB and start server
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('❌ DB connection failed:', err.message);
});
