const express = require('express');

const router = express.Router();
const yvcService = require('../services/youtubeVideoCollect');

// /yvc-server

router.get('/', async (_req, res) => {
  const queryResult = await yvcService.getVideoInfo();
  res.status(200).json(queryResult);
});

module.exports = {
  router,
};
