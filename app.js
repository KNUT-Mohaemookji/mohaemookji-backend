const express = require('express');

const app = express();
const db = require('./src/loader/database');
const { logger } = require('./src/util/logger');
const KeywordUpdater = require('./src/loader/keyword');
const ConfigUpdater = require('./src/loader/config');
const CookingVideoApi = require('./src/api/cookingVideo');

const port = 16261;
app.use('/cooking-video', CookingVideoApi);

async function main() {
  app.listen(port, () => {
    logger.info(`Server Running on ${port} port`);
  });

  try {
    await db.connectOnDatabase();
    await KeywordUpdater.updateKeywords();
    await ConfigUpdater.updateConfig();
  } catch (e) {
    logger.error(`[APP-INIT] ${e}`);
  }
}

main();
