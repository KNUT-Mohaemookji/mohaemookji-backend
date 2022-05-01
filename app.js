const express = require('express');

const app = express();
const db = require('./src/loader/database');
const { logger } = require('./src/config/logger');
const CookingVideoApi = require('./src/api/cookingVideo');

const port = 16261;
app.use('/cooking-video', CookingVideoApi);

async function main() {
  app.listen(port, () => {
    logger.info(`Server Running on ${port} port`);
  });

  try {
    await db.connectOnDatabase();
  } catch (e) {
    logger.error('Server Init Error %s', e);
  }
}

main();
