const { CookingVideoModel } = require('../models/cookingVideo');

async function saveCookingVideo(updates) {
  try {
    updates.forEach(async (update) => {
      await CookingVideoModel.updateOne({ videoId: update.videoId }, update, {
        new: true,
        upsert: true,
      });
    });
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  saveCookingVideo,
};
