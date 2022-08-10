const mongoose = require('mongoose');

const testimonialsSchema = new mongoose.Schema({
  author: { type: String, require: true },
  text: { type: String, require: true },
});

module.exports = mongoose.model('Testimonial', testimonialsSchema);
