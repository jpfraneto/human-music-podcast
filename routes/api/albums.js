const express = require('express');
const router = express.Router();
const Album = require('../../models/Album');

router.get('/', async (req, res) => {
  try {
    const albums = await Album.find({});
    res.json({ 123: 456 });
  } catch (err) {
    console.log(err);
  }
});

// router.post('/', async (req, res) => {
//   try {
//     if (process.env.NEWEP_PASSWORD === req.body.password) {
//       const {
//         audioFileUrl,
//         guestCountry,
//         guestName,
//         dateRecorded,
//         language,
//       } = req.body;
//       const newEpisode = new Episode({
//         audioFileUrl,
//         guestCountry,
//         guestName,
//         dateRecorded,
//         language,
//       });
//       await newEpisode.save();
//       return res.json({ msg: 'The episode was saved in the db' });
//     } else {
//       return res.json({
//         msg: 'There was a problem adding the episode to the db',
//       });
//     }
//   } catch (err) {}
// });

module.exports = router;
