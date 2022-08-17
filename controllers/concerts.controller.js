const Concert = require('../models/concerts.model');
const sanitize = require('mongo-sanitize');

exports.getAllConcerts = async (req, res) => {
  try {
    res.json(await Concert.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandomConcert = async (req, res) => {
  try {
    const count = await Concert.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const con = await Concert.findOne().skip(rand);
    if (!con) res.status(404).json({ message: 'Not found...' });
    else res.json(con);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getConcertById = async (req, res) => {
  try {
    const con = await Concert.findById(req.params.id);
    if (!con) res.status(404).json({ message: 'Not found...' });
    else res.json(con);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getConcertByPerformer = async (req, res) => {
  try {
    const con = await Concert.find({ performer: req.params.performer });
    if (!con) res.status(404).json({ message: 'Not found...' });
    else res.json(con);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getConcertByGenre = async (req, res) => {
  try {
    const con = await Concert.find({ genre: req.params.genre });
    if (!con) res.status(404).json({ message: 'Not found...' });
    else res.json(con);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getConcertByPrice = async (req, res) => {
  try {
    const con = await Concert.find({
      price_min: req.params.price,
      price_max: req.params.price,
    });
    if (!con) res.status(404).json({ message: 'Not found...' });
    else res.json(con);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getConcertByDay = async (req, res) => {
  try {
    const con = await Concert.find({ day: req.params.day });
    if (!con) res.status(404).json({ message: 'Not found...' });
    else res.json(con);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addConcert = async (req, res) => {
  const { performer, genre, price, day, image } = sanitize(req.body);
  try {
    const newConcert = new Concert({
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
};

exports.updateConcertById = async (req, res) => {
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
};

exports.removeConcertById = async (req, res) => {
  try {
    const con = await Concert.findById(req.params.id);
    if (con) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json({ message: 'Ok' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
