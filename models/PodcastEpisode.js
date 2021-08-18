const mongoose = require('mongoose');
const PodcastEpisodeSchema = new mongoose.Schema({
  audioFileUrl: {
    type: String,
  },
  guestCountry: {
    type: String,
  },
  guestImageUrl: {
    type: String,
  },
  guestName: {
    type: String,
  },
  albumImageUrl: {
    type: String,
  },
  albumName: {
    type: String,
  },
  dateRecorded: {
    type: String,
  },
  datePublished: {
    type: String,
  },
  language: {
    type: String,
  },
  description: {
    type: String,
  },
});

module.exports = PodcastEpisode = mongoose.model(
  'PodcastEpisode',
  PodcastEpisodeSchema,
);
