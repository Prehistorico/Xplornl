const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 1000
  },
  
  status: {
    type: String,
    enum: ['approved', 'pending', 'rejected'],
    default: 'pending'
  },
    likes: {
        count: { type: Number, default: 0 },
        users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },

}, 
{
  timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);