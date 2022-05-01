const mongoose = require('mongoose');
const { logger } = require('../config/logger');

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

module.exports = {
  connectOnDatabase,
};
