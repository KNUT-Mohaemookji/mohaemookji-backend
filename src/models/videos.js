const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
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

const mealModel = mongoose.model('Meal', videoSchema);
const snackModel = mongoose.model('Snack', videoSchema);
const sportModel = mongoose.model('Sport', videoSchema);
const dietModel = mongoose.model('Diet', videoSchema);
const wellbeingModel = mongoose.model('Wellbeing', videoSchema);

module.exports = {
  mealModel,
  snackModel,
  sportModel,
  dietModel,
  wellbeingModel,
};
