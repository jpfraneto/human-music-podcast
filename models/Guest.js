const mongoose = require('mongoose');
const GuestSchema = new mongoose.Schema({
  guestName: {
    type: String,
  },
  email: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  albumName: {
    type: String,
  },
  hasImage: {
    type: Boolean,
    default: false,
  },
  albumImageUrl: {
    type: String,
  },
  albumOfTheDayStatus: {
    type: String,
  },
  albumOfTheDayDate: {
    type: Date,
  },
  interviewed: {
    type: Boolean,
    default: false,
  },
  podcast: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PodcastEpisode',
  },
});

module.exports = Guest = mongoose.model('Guest', GuestSchema);
