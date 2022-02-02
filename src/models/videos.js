const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  query: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  channelId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
  },
});

module.exports = {
  Meal: mongoose.model('Meal', VideoSchema),

  Snack: mongoose.model('Snack', VideoSchema),

  Sport: mongoose.model('Sport', VideoSchema),

  Diet: mongoose.model('Diet', VideoSchema),

  Wellbeing: mongoose.model('Wellbeing', VideoSchema),
};
