const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  tags: {
    place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place'
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
  },

  likes: {
    count: { type: Number, default: 0 },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },

  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }

}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);