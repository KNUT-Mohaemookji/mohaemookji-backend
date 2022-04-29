const KEY = require('../jobs/token')();

const apiOpts = {
  search: {
    key: KEY,
    part: 'id',
    order: 'date',
    maxResults: 3,
    type: 'video',
    videoEmbeddable: 'true',
    videoSyndicated: 'true',
    fields: 'items(id)',
  },
  videos: {
    key: KEY,
    part: 'snippet', // +statistics
    fields: 'items(id, snippet(channelId, title, thumbnails))',
  },
  channels: {
    key: KEY,
    part: 'snippet, statistics',
    fields:
      'items(id, snippet(title, thumbnails), statistics(viewCount, commentCount, subscriberCount, videoCount))',
  },
  searchChannels: {
    key: KEY,
    part: 'id',
    categoryId: '',
    maxResults: 3,
    fields: 'items(id)',
  },
};

module.exports = apiOpts;
