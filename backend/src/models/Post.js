const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { 
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 120
  },

  description: {
    type: String,
    trim: true,
    maxlength: 2000
  },

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

postSchema.index({ user: 1 });
postSchema.index({ status: 1 });
postSchema.index({ createdAt: -1 });
postSchema.index({
  title: 'text',
  description: 'text'
});

module.exports = mongoose.model('Post', postSchema);