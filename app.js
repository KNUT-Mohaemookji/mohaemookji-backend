const express = require('express');

const app = express();
const videoListApi = require('./src/api/videoList');
const { logger } = require('./src/config/logger');
const db = require('./src/loaders/database');
const { createSearchKeyword } = require('./src/loaders/searchKeywordCreate');

const port = 16261;

async function main() {
  app.listen(port, () => {
    logger.info(`Server Running on ${port} port`);
  });

  app.use('/', videoListApi);
  db.connectOnDatabase()
    .then(() => {
      createSearchKeyword();
    })
    .catch((e) => {
      logger.error(`Server Init Error ${e}`);
    });
}

main();

module.exports = {
  main,
};
