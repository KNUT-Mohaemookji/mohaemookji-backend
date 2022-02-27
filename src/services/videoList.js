const videoListModel = require('../queries/videoList');

async function getRandomVideoOfTopic(topic) {
  const videoList = videoListModel.getRandomVideoOfTopic(topic);
  return videoList;
}

module.exports = {
  getRandomVideoOfTopic,
};
