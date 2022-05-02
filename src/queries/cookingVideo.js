const { CookingVideoModel } = require('../models/cookingVideo');

async function getRandomCookingVideo(theme) {
  try {
    if (theme) {
      return CookingVideoModel.aggregate([
        {
          $match: { theme },
        },
        { $sample: { size: 10 } },
      ]);
    }

    return CookingVideoModel.aggregate([
      { $sample: { size: 10 } },
    ]);
  } catch (e) {
    throw new Error(e);
  }
}

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
  getRandomCookingVideo,
  saveCookingVideo,
};
