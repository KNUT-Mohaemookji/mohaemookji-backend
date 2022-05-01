const mongoose = require('mongoose');

const CookingChannelModel = mongoose.model(
  'CookingChannel',
  new mongoose.Schema({
    keyword: {
      type: String,
      required: true,
    },
    channelId: {
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
  }, {collection: 'CookingChannel'}),
);

module.exports = {
  CookingChannelModel,
};
