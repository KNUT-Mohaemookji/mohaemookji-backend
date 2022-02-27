const express = require('express');

const router = express.Router();
const videoListService = require('../services/videoList');

// /video-list

router.get('/', async (_req, res) => {
  const videoList = await videoListService.getRandomVideo();
  res.json(videoList);
});

router.get('/:topic', (req, res) => {
  try {
    const videoListObj = videoListService.getRandomVideoOfTopic(req.params.topic);
    res.send(videoListObj);
  } catch (e) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
