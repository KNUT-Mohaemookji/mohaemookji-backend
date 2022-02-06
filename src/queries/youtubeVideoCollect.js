const { logger } = require('../config/logger');
const db = require('./databaseConnect');

function getRandomVideo(collectionName, value) {
  const model = db.getModel(collectionName);
  let queryResult;

  try {
    // FIX 모델에서 랜덤으로 비디오를 가져오도록 설정
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
  getRandomVideo,
};
