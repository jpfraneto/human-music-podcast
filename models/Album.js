const mongoose = require('mongoose');
const AlbumSchema = new mongoose.Schema({
  date: {
    type: Date,
  },
  imageUrl: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
});

module.exports = Album = mongoose.model('Album', AlbumSchema);
