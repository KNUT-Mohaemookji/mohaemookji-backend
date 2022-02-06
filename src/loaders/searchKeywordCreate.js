const db = require('../queries/databaseQuery');

const { logger } = require('../config/logger');
const searchWordList = require('./searchWordList').searchWords;

async function createSearchKeyword() {
  const topics = Object.keys(searchWordList);

  logger.info(`검색어 : ${JSON.stringify(topics)}`);

  const result = db.getData('snackModel', { query: '케이크' });

  logger.info(result);
}

module.exports = {
  createSearchKeyword,
};
