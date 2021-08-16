const express = require('express');
const router = express.Router();
const Guest = require('../../models/Guest');
const functions = require('../../utils/functions');

router.post('/', async (req, res) => {
  try {
    const { albumImageUrl, albumName, guestName, email } = req.body;
    const newGuest = new Guest({
      albumImageUrl,
      albumName,
      guestName,
      email,
    });
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
    console.log('The guests that are present in the db are:', guests);
    res.json(guests);
  } catch (err) {
    console.log(err);
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
