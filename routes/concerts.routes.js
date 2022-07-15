const express = require('express');
const { v4: uuid } = require('uuid');
const db = require('../db.js');
const router = express.Router();

//endpoints
router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/random').get((req, res) => {
  res.json(db.concerts[Math.floor(Math.random() * db.concerts.length)]);
});

router.route('/concerts/:id').get((req, res) => {
  res.json(db.concerts.find((data) => data.id == req.params.id));
});

router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const id = uuid();

  const newObject = {
    id: id,
    performer: performer,
    genre: genre,
    price: price,
    day: day,
    image: image,
  };

  db.concerts.push(newObject);
  res.json({ message: 'Ok' });
});

router.route('/concerts/:id').put((req, res) => {
  const id = req.params.id;
  const findItem = db.concerts.find((data) => data.id == id);
  const index = db.concerts.indexOf(findItem);
  const { performer, genre, price, day, image } = req.body;
  const changeItem = {
    id: id,
    performer: performer,
    genre: genre,
    price: price,
    day: day,
    image: image,
  };

  db.concerts[index] = changeItem;
  res.json({ message: 'Ok' });
});

router.route('/concerts/:id').delete((req, res) => {
  const item = db.concerts.find((data) => data.id == req.param.id);
  const index = db.concerts.indexOf(item);

  db.concerts.splice(index, 1);
  res.json({ message: 'Ok' });
});

module.exports = router;
