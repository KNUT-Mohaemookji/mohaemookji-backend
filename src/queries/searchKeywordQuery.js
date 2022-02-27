const { logger } = require('../config/logger');
const db = require('./databaseConnect');

function getData(collectionName, value) {
  const model = db.getModel(collectionName);
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
    logger.info('model query error %s', e);
    throw new Error(e);
  }
  return queryResult;
}

module.exports = {
  getData,
};
