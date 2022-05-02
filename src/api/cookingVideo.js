const express = require('express');
const { logger } = require('../util/logger');

const router = express.Router();
const CookingVideoService = require('../services/cookingVideo');

// /cooking-video

router.get('/', async (req, res) => {
  const videoList = await CookingVideoService.getRandomCookingVideo(req.query.theme);
  res.json(videoList);
});

// 유튜브 비디오 저장 테스트를 위해 임시 작성
router.get('/test', async (_req, res) => {
  try {
    const videoListObj = await CookingVideoService.saveCookingVideo();

    res.send(videoListObj);
  } catch (e) {
    logger.error(`api ${e}`);
    res.status(500).send('Error!!');
  }
});

module.exports = router;
