const express = require('express');

const app = express();
const { logger } = require('./src/config/logger');
const db = require('./src/queries/databaseConnect');
const { createSearchKeyword } = require('./src/loaders/searchKeywordCreate');

const videoList = require('./src/api/videoList');
const youtubeVideoCollect = require('./src/api/youtubeVideoCollect');

const port = 16261;
app.use('/video-list', videoList);
app.use('/yvc-server', youtubeVideoCollect);

async function main() {
  app.listen(port, () => {
    logger.info(`Server Running on ${port} port`);
  });

  db.connectOnDatabase()
    .then(() => {
      // DB에 데이터를 저장하기 위한 검색어를 데이터베이스에 저장
      createSearchKeyword();
    })
    .catch((e) => {
      logger.error(`Server Init Error ${e}`);
    });
}

main();
