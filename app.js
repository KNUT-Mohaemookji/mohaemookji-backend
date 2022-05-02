const express = require('express');

const app = express();
const db = require('./src/loader/database');
const { logger } = require('./src/util/logger');
const KeywordUpdater = require('./src/loader/keyword');
const ConfigUpdater = require('./src/loader/config');
const SchedulerService = require('./src/services/scheduler');
const CookingVideoApi = require('./src/api/cookingVideo');
const CookingChannelApi = require('./src/api/cookingChannel');

const port = 16261;
app.use('/cooking-video', CookingVideoApi);
app.use('/cooking-channel', CookingChannelApi);

async function main() {
  app.listen(port, () => {
    logger.info(`Server Running on ${port} port`);
  });

  try {
    await db.connectOnDatabase();
    await KeywordUpdater.updateKeywords();
    await ConfigUpdater.updateConfig();
    await SchedulerService.collectYoutubeVideo();
  } catch (e) {
    logger.error(`[APP-INIT] ${e}`);
  }
}

main();
