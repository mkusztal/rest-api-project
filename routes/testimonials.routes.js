const express = require('express');
const { v4: uuid } = require('uuid');
const db = require('./../db.js');
const router = express.Router();

//endpoints
router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});

router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testimonials.find((data) => data.id == req.params.id));
});

router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;
  const id = uuid();

  const newObject = {
    id: id,
    author: author,
    text: text,
  };

  db.testimonials.push(newObject);
  res.json({ message: 'Ok' });
});

router.route('/testimonials/:id').put((req, res) => {
  const id = req.params.id;
  const findItem = db.testimonials.find((data) => data.id == req.params.id);
  const index = db.testimonials.indexOf(findItem);
  const { author, text } = req.body;
  const changeItem = {
    id: id,
    author: author,
    text: text,
  };

  db.testimonials[index] = changeItem;
  res.json({ message: 'Ok' });
});

router.route('/testimonials/:id').delete((req, res) => {
  const item = db.testimonials.find((data) => data.id == req.param.id);
  const index = db.testimonials.indexOf(item);

  db.testimonials.splice(index, 1);
  res.json({ message: 'Ok' });
});

module.exports = router;
