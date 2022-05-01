const express = require('express');
const { logger } = require('../config/logger');

const router = express.Router();
const CookingVideoService = require('../services/cookingVideo');

// /cooking-video

router.get('/', async (_req, res) => {
  const videoList = await CookingVideoService.getRandomVideo();
  res.json(videoList);
});

router.get('/test', async (req, res) => {
  try {
    const videoListObj = await CookingVideoService.saveCookingVideo();
    res.send(videoListObj);
  } catch (e) {
    logger.error(e);
    res.status(500).send('Server Error!!!');
  }
});

module.exports = router;
