const express = require('express');

const router = express.Router();
const CookingChannelService = require('../services/cookingChannel');

// /cooking-channel

router.get('/', async (_req, res) => {
  const videoList = await CookingChannelService.getRandomCookingChannel();
  res.json(videoList);
});

module.exports = router;
