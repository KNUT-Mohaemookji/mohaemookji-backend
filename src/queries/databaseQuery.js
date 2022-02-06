const mongoose = require('mongoose');
const { logger } = require('../config/logger');

const db = mongoose.connection;

// Database Collection Create on DB
const searchKeywordModel = require('../models/searchkeywords');
const channelModel = require('../models/channel');
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
    case 'mealModel':
      model = mealModel;
      break;
    case 'snackModel':
      model = snackModel;
      break;
    case 'sportModel':
      model = sportModel;
      break;
    case 'dietModel':
      model = dietModel;
      break;
    case 'wellbeingModel':
      model = wellbeingModel;
      break;
    case 'channelModel':
      model = channelModel;
      break;
    case 'searchKeywordModel':
      model = searchKeywordModel;
      break;
    default:
      logger.error('model is not exist');
  }

  return model;
}

function getData(collectionName, value) {
  const model = getModel(collectionName);
  let queryResult;

  try {
    queryResult = model.findOne(value, (err, datas) => {
      if (err) throw err;
      else {
        const result = datas.title;
        return result;
      }
    });
  } catch (e) {
    logger.info(`model query error ${e}`);
  }
  return queryResult;
}

module.exports = {
  connectOnDatabase,
  getData,
};
