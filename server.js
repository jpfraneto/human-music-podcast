require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const functions = require('./utils/functions');
var cron = require('node-cron');
const path = require('path');

connectDB();

//El setup en el que funciona es 'minutos horas * * dia', con los parámetros del reloj de mi computador
cron.schedule('15 15 * * 3', () => {
  console.log('ejecutado a las 15:15');
  functions.getRandomGuest();
});

cron.schedule('15 20 * * 3', () => {
  console.log('ejecutado a las 20:15');
  functions.getRandomGuest();
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
