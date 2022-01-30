const express = require('express');

const router = express.Router();
const videoListService = require('../services/videoList');

router.get('/', (req, res) => {
  res.sendStatus(200);
});

router.get('/getCookingVideo', (req, res) => {
  const videoListObj = videoListService.getRandomVideo(req.body);
  res.send(videoListObj);
});

module.exports = router;
