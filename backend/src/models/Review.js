const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100
  },

  description: {
    type: String,
    trim: true,
    maxlength: 1000
  },

  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place',
    required: true
  },

  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }

}, {
  timestamps: true
});

reviewSchema.index(
  { user: 1, place: 1 },
  { unique: true }
);

module.exports = mongoose.model('Review', reviewSchema);