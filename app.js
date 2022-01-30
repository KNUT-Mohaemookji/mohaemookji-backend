const express = require('express');

const app = express();
const videoListApi = require('./src/api/videoList');
const { logger } = require('./src/config/logger');
const db = require('./src/models/dbConnect');

const port = 16261;

async function main() {
  app.listen(port, () => {
    logger.info(`Server Running on ${port} port`);
  });

  app.use('/', videoListApi);

  try {
    db.connectToDb();
  } catch (e) {
    logger.error(`Server Init Error ${e}`);
  }
}

main();

module.exports = {
  main,
};
