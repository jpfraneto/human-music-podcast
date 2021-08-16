const mongoose = require('mongoose');
const TimelessnessSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  text: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  recordingUrl: {
    type: String,
  },
  uniqueID: {
    type: String,
  },
  duration: {
    type: Number,
  },
  mediaType: {
    type: String,
  },
  country: {
    type: String,
  },
});

module.exports = Timelessness = mongoose.model(
  'Timelessness',
  TimelessnessSchema,
);
