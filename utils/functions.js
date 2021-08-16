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

functions.sendInvitationToRandomGuest = randomGuest => {
  const data = {
    from: 'welcome@hmp.org',
    to: randomGuest.email,
    subject: 'Welcome to the Human Music Podcast',
    html:
      `<h3>Hello ${randomGuest.name}!Thank you for trusting in me.</h3><br/> <p> This is an automated message. In order to keep things random I had to do it like this. You are the only person that has gotten this email.</p> <br/><p>If you don't want to participate, please click the following link so that a new guest can be invited <a href='` +
      'http://www.human-music.com' +
      "'><span>click here</span></a>.</p><br/><p></p>",
  };
  mg.messages().send(data, function (error, body) {
    console.log(
      `The email was sent to ${randomGuest.email}, the body of the callback is: ${body}`,
    );
  });
};

module.exports = functions;
