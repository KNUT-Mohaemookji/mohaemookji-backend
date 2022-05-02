const mongoose = require('mongoose');

const CookingVideoModel = mongoose.model(
  'CookingVideo',
  new mongoose.Schema({
    keyword: {
      type: String,
      required: true,
    },
    videoId: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
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
    theme: {
      type: String,
    },
  }, { collection: 'CookingVideo' }),
);

module.exports = {
  CookingVideoModel,
};
