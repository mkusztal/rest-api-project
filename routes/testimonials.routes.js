const express = require('express');
const router = express.Router();
const TestimonialController = require('../controllers/testimonials.controller');

router.get('/testimonials', TestimonialController.getAllTestimonials);
router.get('/testimonials/random', TestimonialController.getRandomTestimonial);
router.get('/testimonials/:id', TestimonialController.getTestimonialsById);
router.post('/testimonials', TestimonialController.addTestimonial);
router.put('/testimonials/:id', TestimonialController.updateTestimonialsById);
router.delete(
  '/testimonials/:id',
  TestimonialController.removeTestimonialsById
);

module.exports = router;
