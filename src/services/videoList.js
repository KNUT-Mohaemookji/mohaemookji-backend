const videoListModel = require('../queries/videoList');

async function getRandomVideo(theme) {
  const videoList = videoListModel.getRandomVideo(theme);
  return videoList;
}

module.exports = {
  getRandomVideo,
};
