const { logger } = require('../config/logger');
const { CookingVideoModel } = require('../models/cookingVideo');

async function saveCookingVideo(updates) {
  try {
    updates.forEach(async (update) => {
      await CookingVideoModel.updateOne({ videoId: update.videoId }, update, { new: true, upsert: true })
    });
  } catch (e) {
    logger.error(`[SAVE-COOKING-QUERY] ${e}`);
  }
}

module.exports = {
  saveCookingVideo,
};
