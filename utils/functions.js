const Guest = require('../models/Guest');
const mailgun = require('mailgun-js');
const DOMAIN = 'sandbox4f8799851e8d49799825f02ec8411dc7.mailgun.org';
const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: DOMAIN,
});

functions = {};
functions.getRandomGuest = async () => {
  const guests = await Guest.find({});
  const randomIndex = Math.floor(Math.random() * guests.length);
  const randomGuest = guests[randomIndex];
  functions.sendInvitationToRandomGuest(randomGuest);
};

functions.changePresentAlbum = async () => {
  const presentAlbum = await Guest.findOne({
    albumOfTheDayStatus: 'present',
  });
  presentAlbum.albumOfTheDayStatus = 'past';
  await presentAlbum.save();
  console.log(`The album ${presentAlbum.albumName} was sent to the past`);
  functions.presentizeRandomAlbum();
};

functions.presentizeRandomAlbum = async () => {
  const futureAlbums = await Guest.find({ albumOfTheDayStatus: 'future' });
  const randomIndex = Math.floor(Math.random() * futureAlbums.length);
  const nextAlbum = futureAlbums[randomIndex];
  nextAlbum.albumOfTheDayDate = new Date();
  nextAlbum.albumOfTheDayStatus = 'present';
  await nextAlbum.save();
  console.log(
    `The album ${nextAlbum.albumName} was brought to the present`,
  );
};

module.exports = functions;
