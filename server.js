require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const functions = require('./utils/functions');
var cron = require('node-cron');
const path = require('path');

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`);
    else next();
  });
}

connectDB();
//El setup en el que funciona es 'minutos horas * * dia', con los parámetros del reloj de mi computador
cron.schedule('22 12 * * *', () => {
  console.log('inside the cron job at 12:22!');
  functions.changePresentAlbum();
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/timelessness', require('./routes/api/timelessness'));
app.use('/api/guests', require('./routes/api/guests'));
app.use('/api/episodes', require('./routes/api/episodes'));
app.use('/api/albums', require('./routes/api/albums'));

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
