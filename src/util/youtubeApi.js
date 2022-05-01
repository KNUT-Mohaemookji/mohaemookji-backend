const { google } = require('googleapis');
const path = require('path');
const appRoot = require('app-root-path');
const dotenv = require('dotenv');

const env = process.env.NODE_ENV === 'production' ? '.env' : 'mh.env';
dotenv.config({ path: path.resolve(`${appRoot}`, env) });

/**
 * youtube Data Api를 호출하여 필요한 결과를 받아낸다.
 *
 * @param {string} option API에 요청할 정보의 종류와 그에 대한 옵션
 * @param {string} key API 요청을 위한 토큰키
 * @return {object} API 요청 결과
 */
async function requestToYoutube(option, key, keyword) {
  const apiOpts = {
    video: {
      key,
      part: 'id, snippet',
      order: 'date',
      maxResults: 3,
      type: 'video',
      videoEmbeddable: 'true',
      videoSyndicated: 'true',
      fields: 'items(id, snippet(channelId, title, thumbnails))',
      q: keyword,
    },
    channel: {
      key,
      part: 'snippet, statistics',
      fields:
        'items(id, snippet(title, thumbnails), statistics(viewCount, commentCount, subscriberCount, videoCount))',
    },
  };
  return google.youtube('v3').search.list(apiOpts[option]);
}

/**
 * Youtube Data Api로 요청할 옵션을 설정하고 결과를 정재하여 반환한다.
 *
 * @param {string} option API에 요청할 정보의 종류와 그에 대한 옵션
 * @param {string} type API 요청할 정보의 타입 (Video / Channel)
 * @return {object} API 요청 결과
 */
async function getYoutubeApiResponse(option) {
  // key와 keyword, theme를 랜덤으로 뽑아내서 호출한다
  const keys = process.env.YOUTUBE_TOKEN.split(',');
  const keyword = '콩나물국';
  const theme = 'meal';
  const results = (await requestToYoutube(option, keys[0], keyword)).data.items;

  return results.map(({ id, snippet }) => ({
    keyword,
    videoId: id.videoId,
    title: snippet.title,
    thumbnail: snippet.thumbnails.default.url,
    url: `https://www.youtube.com/watch?v=${id.videoId}`,
    channelId: snippet.channelId,
    theme,
  }));
}

module.exports = {
  getYoutubeApiResponse,
};
