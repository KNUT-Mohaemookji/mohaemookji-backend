const apiOpts = require('../config/options');

async function fnReqData(_method, _opts) {
  const response = await _method.list(_opts);
  const items = fnHandleResponse(response);
  return items;
}

function fnHandleResponse(response) {
  const items = response.data.items || [];
  if (items == null || items.length === 0) return new Error('No items.\n');
  return items;
}

const apiCtrls = {
  async fnReqSearchList(_service, _q, topicId = null) {
    apiOpts.search.q = _q;
    // apiOpts.search.topicId = _topicId;

    const items = await fnReqData(_service.search, apiOpts.search);
    return items;
  },
  async fnReqVideosData(_service, _q, _vIds) {
    apiOpts.videos.id = _vIds;

    const items = await fnReqData(_service.videos, apiOpts.videos);

    const objs = [];

    items.map((item) => {
      const { id, snippet } = item;
      const { channelId, title, thumbnails } = snippet;

      const url = `https://www.youtube.com/watch?v=${id}`;
      const thumbnail = thumbnails.default.url;

      objs.push({
        query: _q, id, url, channelId, title, thumbnail,
      });
    });

    return objs;
  },
  async fnReqChannelsData(_service, _cIds) {
    apiOpts.channels.id = _cIds;

    const items = await fnReqData(_service.channels, apiOpts.channels);

    const objs = [];

    items.map((item) => {
      const { id, snippet } = item;
      const { title, thumbnails } = snippet;

      const url = `https://www.youtube.com/channel/${id}`;
      const thumbnail = thumbnails.default.url;

      objs.push({
        id, url, title, thumbnail,
      });
    });

    return objs;
  },
};

module.exports = apiCtrls;
