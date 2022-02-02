const logger = require('../config/logger');

const TOKENS = process.env.YOUTUBE_TOKEN;

function getYoutubeTokenKeys() {
  const yotubeTokenDatas = TOKENS.split(',');
  const youtubeTokenKeys = yotubeTokenDatas[new Date().getDate() % yotubeTokenDatas.length];

  youtubeTokenKeys.forEach((key) => {
    logger.info(`use youtube api key : ${key}`);
  });
  return youtubeTokenKeys;
}

function suffleData() {
  let j;
  const cList = [];

  for (let i = cList.length - 1; i > 0; i - 1) {
    j = Math.floor(Math.random() * (i + 1));
    [cList[i], cList[j]] = [cList[j], cList[i]];
  }
  return cList;
}

module.exports = {
  getYoutubeTokenKeys,
  suffleData,
};
