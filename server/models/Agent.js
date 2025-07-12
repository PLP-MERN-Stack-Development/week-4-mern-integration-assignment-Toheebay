const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  website: { type: String },
  whatsapp: { type: String },
  image: { type: String },
  isSubscribed: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Agent', agentSchema);
