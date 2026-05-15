const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100
  },

  description: {
    type: String,
    trim: true,
    maxlength: 2000
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },

  zone: {
    type: String,
    trim: true,
    maxlength: 100
  },

  location: {

    address: {
      type: String,
      trim: true,
      maxlength: 300
    },

    coordinates: {

      lat: {
        type: Number,
        min: -90,
        max: 90
      },

      lng: {
        type: Number,
        min: -180,
        max: 180
      }
    }
  },

  schedule: {

    days: [{
      type: String,
      trim: true,
      maxlength: 20
    }],

    open: {
      type: String,
      trim: true,
      maxlength: 10
    },

    close: {
      type: String,
      trim: true,
      maxlength: 10
    }
  },

  contact: {

    phone: {
      type: String,
      trim: true,
      maxlength: 30,
      match: /^[0-9+\-\s()]+$/
    },

    website: {
      type: String,
      trim: true,
      maxlength: 300,
      match: /^https?:\/\/.+/
    }
  },

  details: {

    spaceType: {
      type: String,
      trim: true,
      maxlength: 100
    },

    cost: {
      type: String,
      trim: true,
      maxlength: 50
    },

    parking: {
      type: String,
      trim: true,
      maxlength: 50
    },

    shops: {
      type: String,
      trim: true,
      maxlength: 50
    },

    restrooms: {
      type: String,
      trim: true,
      maxlength: 50
    },

    activities: [{
      type: String,
      trim: true,
      maxlength: 100
    }]
  },

  transport: {

    publicTransport: {
      type: String,
      trim: true,
      maxlength: 300
    },

    car: {
      type: String,
      trim: true,
      maxlength: 300
    }
  },

  rating: {

    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },

    count: {
      type: Number,
      default: 0,
      min: 0
    }
  }

}, {
  timestamps: true
});

module.exports = mongoose.model('Place', placeSchema);