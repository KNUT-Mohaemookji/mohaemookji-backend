const { CookingChannelModel } = require('../models/cookingChannel');

async function getRandomCookingChannel() {
  try {
    return CookingChannelModel.aggregate([{ $sample: { size: 10 } }]);
  } catch (e) {
    throw new Error(e);
  }
}

async function saveCookingChannel(updates) {
  try {
    updates.forEach(async (update) => {
      await CookingChannelModel.updateOne({ channelId: update.channelId }, update, {
        new: true,
        upsert: true,
      });
    });
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  getRandomCookingChannel,
  saveCookingChannel,
};
