const express = require('express');
const { v4: uuid } = require('uuid');
const db = require('./../db.js');
const router = express.Router();

const Testimonial = require('../models/testimonials.model');

//endpoints
router.get('/testimonials', async (req, res) => {
  try {
    res.json(await Testimonial.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/testimonials/random', async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const tes = await Testimonial.findOne().skip(rand);
    if (!tes) res.status(404).json({ message: 'Not found...' });
    else res.json(tes);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/testimonials/:id', async (req, res) => {
  try {
    const tes = await Testimonial.findById(req.params.id);
    if (!tes) res.status(404).json({ message: 'Not found...' });
    else res.json(tes);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post('/testimonials', async (req, res) => {
  const { author, text } = req.body;
  const id = uuid();

  try {
    const newTestimonial = new Testimonial({
      id: id,
      author: author,
      text: text,
    });
    await newTestimonial.save();
    res.json({ message: 'Ok' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put('/testimonials/:id', async (req, res) => {
  const { author, text } = req.body;
  try {
    const tes = await Testimonial.findById(req.params.id);
    if (tes) {
      await Testimonial.updateOne(
        { _id: req.params.id },
        {
          $set: {
            author: author,
            text: text,
          },
        }
      );
    }
    res.json({ message: 'Ok' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete('/testimonials/:id', async (req, res) => {
  try {
    const tes = Testimonial.findById(req.params.id);
    if (tes) {
      await Testimonial.deleteOne({ _id: req.params.id });
      res.json({ message: 'Ok' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
