const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },

  description: String,

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },

  zone: String,

  location: {
    address: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },

  schedule: {
    days: [String], 
    open: String, 
    close: String 
  },

  contact: {
    phone: String,
    website: String
  },

  details: {
    spaceType: String, 
    cost: String,
    parking: String,
    shops: String,
    restrooms: String,
    activities: [String]
  },

  transport: {
    publicTransport: String,
    car: String
  },

  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  }

}, { timestamps: true });

module.exports = mongoose.model('Place', placeSchema);