const mongoose = require('mongoose');

const keywordModel = mongoose.model(
  'Keyword',
  new mongoose.Schema({
    keywords: {
      type: Array,
    },
    theme: {
      type: String,
      require: true,
      unique: true,
    },
    type: {
      type: String,
      require: true,
      unique: true,
    }
  }, { collection: 'Keyword' }),
);

module.exports = {
  keywordModel,
};
