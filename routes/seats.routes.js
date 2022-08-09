const express = require('express');
const { v4: uuid } = require('uuid');
const Seat = require('../models/seats.model');

const router = express.Router();
//endpoints
router.get('/seats', async (req, res) => {
  res.json(await Seat.find());
  try {
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/seats/random', async (req, res) => {
  try {
    const count = await Seat.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const seat = await Seat.findOne().skip(rand);
    if (!seat) res.status(404).json({ message: 'Not found...' });
    else res.json(seat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/seats/:id', async (req, res) => {
  try {
    const seatId = await Seat.findById(req.params.id);
    if (!seatId) res.status(404).json({ message: 'Not found...' });
    else res.json(seatId);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post('/seats', async (req, res) => {
  const { day, seat, client, email } = req.body;
  const id = uuid();
  try {
    const newSeat = new Seat({
      id: id,
      day: day,
      seat: seat,
      client: client,
      email: email,
    });
    await newSeat.save();
    res.json({ message: 'Ok' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put('/seats/:id', async (req, res) => {
  const { day, seat, client, email } = req.body;
  try {
    const seatId = Seat.findById(req.params.id);
    if (seatId) {
      await Seat.updateOne(
        { _id: req.params.id },
        {
          $set: {
            day: day,
            seat: seat,
            client: client,
            email: email,
          },
        }
      );
    }
    res.json({ message: 'Ok' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete('/seats/:id', async (req, res) => {
  try {
    const seatId = Seat.findById(req.params.id);
    if (seatId) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json({ message: 'Ok' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
