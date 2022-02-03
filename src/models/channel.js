const mongoose = require('mongoose');

/**
 * Channel schema
 * Properties used: Title, Description, Thumbnail, PublishTime, isLive, URL ...
 * Properties to be added: viewCount, likeCount, commentCount
 */

const channelModel = mongoose.model('Channel', new mongoose.Schema({
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
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
  },
}));

module.exports = {
  channelModel,
};
