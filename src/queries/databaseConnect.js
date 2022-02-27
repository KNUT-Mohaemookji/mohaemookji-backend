const mongoose = require('mongoose');
const { logger } = require('../config/logger');

// Database Collection Create on DB
const searchKeywordModel = require('../models/searchkeywords');
const channelModel = require('../models/channels');
const {
  mealModel,
  snackModel,
  sportModel,
  dietModel,
  wellbeingModel,
} = require('../models/videos');

async function connectOnDatabase() {
  const dbUrl = process.env.MONGODB_CONNECTION || 'mongodb://localhost:27017/mohaemookji';

  const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose.connect(dbUrl, connectOptions);

  const db = mongoose.connection;

  db.on('error', (err) => {
    throw new Error(`데이터베이스 연결 오류 ${err}`);
  });

  db.once('open', () => {
    logger.info('데이터베이스 연결 성공');
  });
}

function getModel(collectionName) {
  let model;

  switch (collectionName) {
    case 'meal':
      model = mealModel;
      break;
    case 'snack':
      model = snackModel;
      break;
    case 'sport':
      model = sportModel;
      break;
    case 'diet':
      model = dietModel;
      break;
    case 'wellbeing':
      model = wellbeingModel;
      break;
    case 'channel':
      model = channelModel;
      break;
    case 'searchKeyword':
      model = searchKeywordModel;
      break;
    default:
      logger.error('model is not exist');
  }

  return model;
}

module.exports = {
  connectOnDatabase,
  getModel,
};
