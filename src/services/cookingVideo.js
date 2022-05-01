const { logger } = require('../config/logger');
const YoutubeApiService = require('../util/youtubeApi');
const CookingVideoQuery = require('../queries/cookingVideo');

async function saveCookingVideo() {
  try {
    await CookingVideoQuery.saveCookingVideo(
      await YoutubeApiService.getYoutubeApiResponse('video')
    );
    logger.info(`[SAVE-COOKING-VIDEO-SERVICE] Success`);
  } catch (e) {
    logger.error(`[SAVE-COOKING-VIDEO-SERVICE] ${e}`);
  }
}

module.exports = {
  saveCookingVideo,
};
