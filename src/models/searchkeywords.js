const mongoose = require('mongoose');

const searchKeywordModel = mongoose.model('SearchKeywords', new mongoose.Schema({
  topic: {
    type: String,
    required: true,
    unique: true,
  },
  word: {
    type: String,
    required: true,
    unique: true,
  },
}));

module.exports = {
  searchKeywordModel,
};
