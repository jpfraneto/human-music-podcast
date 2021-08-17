const express = require('express');
const router = express.Router();
const Guest = require('../../models/Guest');
const functions = require('../../utils/functions');

router.get('/all', async (req, res) => {
  const guests = await Guest.find({}).select(
    'albumOfTheDayStatus albumName guestName albumImageUrl email',
  );
  res.json({ albums: guests });
});

router.post('/', async (req, res) => {
  try {
    const { albumImageUrl, albumName, guestName, email } = req.body;
    const newGuest = new Guest({
      albumImageUrl,
      albumName,
      guestName,
      email,
    });
    if (albumImageUrl) newGuest.hasImage = true;
    newGuest.albumOfTheDayStatus = 'future';
    await newGuest.save();
    res.json({
      msg: 'Your information was saved. One day you will be in the podcast and we will have a great conversation. Thanks for trusting this space',
    });
  } catch (err) {
    console.log(err);
  }
});

router.get('/virgins', async (req, res) => {
  try {
    const guests = await Guest.find({ interviewed: false });
    res.json(guests);
  } catch (err) {
    console.log(err);
  }
});

router.get('/present', async (req, res) => {
  try {
    const presentAlbum = await Guest.findOne({
      albumOfTheDayStatus: 'present',
    });
    const { albumImageUrl, albumName, guestName } = presentAlbum;
    const data = {
      albumImageUrl,
      albumName,
      guestName,
    };
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

router.get('/:email', async (req, res) => {
  try {
    const guest = await Guest.findOne({ email: req.params.email });
    let existingGuest = false;
    if (guest) {
      existingGuest = true;
    }
    return res.json({ existingGuest });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
