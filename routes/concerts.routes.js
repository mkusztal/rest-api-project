const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertController.getAllConcerts);
router.get('/concerts/random', ConcertController.getRandomConcert);
router.get('/concerts/:id', ConcertController.getConcertById);
router.get(
  '/concerts/performer/:performer',
  ConcertController.getConcertByPerformer
);
router.get('/concerts/genre/:genre', ConcertController.getConcertByGenre);
router.get(
  '/concerts/price/:price_min/:price_max',
  ConcertController.getConcertByPrice
);
router.get('/concerts/day/:day', ConcertController.getConcertByDay);
router.post('/concerts', ConcertController.addConcert);
router.put('/concerts/:id', ConcertController.updateConcertById);
router.delete('/concerts/:id', ConcertController.removeConcertById);

module.exports = router;
