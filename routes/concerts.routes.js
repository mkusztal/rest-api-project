const express = require('express');
const { v4: uuid } = require('uuid'); //?
const router = express.Router();

const Concert = require('../models/concerts.model');

//endpoints
router.get('/concerts', async (req, res) => {
  try {
    res.json(await Concert.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/concerts/random', async (req, res) => {
  try {
    const count = await Concert.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const con = await Concert.findOne().skip(rand);
    if (!con) res.status(404).json({ message: 'Not found...' });
    else res.json(con);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/concerts/:id', async (req, res) => {
  try {
    const con = await Concert.findById(req.params.id);
    if (!con) res.status(404).json({ message: 'Not found...' });
    else res.json(con);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post('/concerts', async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const id = uuid();
  try {
    const newConcert = new Concert({
      id: id,
      performer: performer,
      genre: genre,
      price: price,
      day: day,
      image: image,
    });
    await newConcert.save();
    res.json({ message: 'Ok' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put('/concerts/:id', async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  try {
    const con = await Concert.findById(req.params.id);
    if (con) {
      await Concert.updateOne(
        { _id: req.params.id },
        {
          $set: {
            performer: performer,
            genre: genre,
            price: price,
            day: day,
            image: image,
          },
        }
      );
    }
    res.json({ message: 'Ok' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete('/concerts/:id', async (req, res) => {
  try {
    const con = Concert.findById(req.params.id);
    if (con) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json({ message: 'Ok' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
