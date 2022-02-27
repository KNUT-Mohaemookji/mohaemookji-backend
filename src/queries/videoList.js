const { logger } = require('../config/logger');
const db = require('./databaseConnect');

function getRandomVideoOfTopic(collectionName) {
  const model = db.getModel(collectionName);
  const duple = [];

  try {
    const randomArrange = model.count();
    const randomIndex = Math.floor(Math.random() * randomArrange);

    logger.info(` : ${randomIndex}`);
    const queryResult = model.find((err, datas) => {
      if (err) throw err;
      else {
        for (let i = 0; i < 9; i += 1) {
          if (!duple.includes(randomIndex)) {
            logger.info(
              i + 1,
              '번 영상\n',
              'title :',
              datas[randomIndex].title,
              '\nthumbnail :',
              datas[randomIndex].thumbnail,
              '\nlink :',
              datas[randomIndex].link,
              '\n',
            );
            duple.push(randomIndex);
          } else {
            duple.pop();
            i -= 1;
          }
        }
        logger.info('출력한 데이터 %s', datas);
        return datas;
      }
    });
    return queryResult;
  } catch (e) {
    logger.info('model query error %s', e);
    throw new Error(e);
  }
}

// function getAllRandomVideo() {
//   const model = db.getModel(collectionName);
// }

module.exports = {
  getRandomVideoOfTopic,
};
