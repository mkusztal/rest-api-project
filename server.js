const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();
app.use(helmet);

const testimonials = require('./routes/testimonials.routes');
const concerts = require('./routes/concerts.routes');
const seats = require('./routes/seats.routes');

//middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/client/build')));

app.use('/api', testimonials);
app.use('/api', concerts);
app.use('/api', seats);

let uri =
  'mongodb+srv://maciej_kusztal:22333444455555@cluster0.zjgyrgz.mongodb.net/NewWaveDB?retryWrites=true&w=majority';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});

db.on('error', (err) => {
  console.log('Error: ', err);
});

app.use((req, res, next) => {
  req.db = db;
  next();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});
