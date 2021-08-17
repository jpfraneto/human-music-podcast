const express = require('express');
const router = express.Router();
const PodcastEpisode = require('../../models/PodcastEpisode');
const Guest = require('../../models/Guest');

router.get('/', async (req, res) => {
  try {
    const episodes = await PodcastEpisode.find({});
    const guests = await Guest.find({ interviewed: true }).populate(
      'podcast',
    );
    res.json(episodes);
  } catch (err) {
    console.log(err);
  }
});

router.post('/', async (req, res) => {
  try {
    if (process.env.NEWEP_PASSWORD === req.body.password) {
      const {
        audioFileUrl,
        guestCountry,
        guestName,
        dateRecorded,
        guestImageUrl,
        language,
      } = req.body;
      const newPodcastEpisode = new PodcastEpisode({
        audioFileUrl,
        guestCountry,
        guestName,
        dateRecorded,
        language,
        guestImageUrl,
      });
      newPodcastEpisode.datePublished = new Date();
      await newPodcastEpisode.save();
      const guest = await Guest.findById(req.body._id);
      guest.interviewed = true;
      guest.podcast = newPodcastEpisode;
      await guest.save();
      return res.json({ msg: 'The episode was saved in this guest' });
    } else {
      return res.json({
        msg: 'There was a problem adding the episode to the db',
      });
    }
  } catch (err) {}
});

module.exports = router;
