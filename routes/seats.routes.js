const express = require('express');
const { v4: uuid } = require('uuid');
const db = require('./../db.js');
const router = express.Router();
const socket = require('socket.io');

//endpoints
router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/random').get((req, res) => {
  res.json(db.seats[Math.floor(Math.random() * db.seats.length)]);
});

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats.find((data) => data.id == req.params.id));
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;
  const id = uuid();

  const newObject = {
    id: id,
    day: day,
    seat: seat,
    client: client,
    email: email,
  };

  const checkSeat = db.seats.some(
    (seat) => seat.seat == newObject.seat && seat.day == newObject.day
  );

  if (!checkSeat) {
    db.seats.push(newObject);
    req.io.emit('seatsUpdated', db.seats);
    res.json({ message: 'Ok' });
  } else {
    res.json({ message: 'The slot is already taken...' });
  }
});

router.route('/seats/:id').put((req, res) => {
  const id = req.params.id;
  const findItem = db.seats.find((data) => data.id == req.params.id);
  const index = db.seats.indexOf(findItem);
  const { day, seat, client, email } = req.body;
  const changeItem = {
    id: id,
    day: day,
    seat: seat,
    client: client,
    email: email,
  };

  db.seats[index] = changeItem;
  res.json({ message: 'Ok' });
});

router.route('/seats/:id').delete((req, res) => {
  const item = db.seats.find((data) => data.id == req.param.id);
  const index = db.seats.indexOf(item);

  db.seats.splice(index, 1);
  res.json({ message: 'Ok' });
});

module.exports = router;
