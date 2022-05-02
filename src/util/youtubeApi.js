/* eslint-disable operator-linebreak */
const { google } = require('googleapis');
const path = require('path');
const appRoot = require('app-root-path');
const dotenv = require('dotenv');
const { logger } = require('./logger');

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
      maxResults: 20,
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
 * @param {string} option API에서 쿼리할 때 설정할 옵션의 이름
 * @param {string} keyword API에서 쿼리할 때 사용할 검색어
 * @param {string} theme DB에 저장할 때의 소분류 (ex: meal, snack 등..)
 * @return {object} API 요청 결과
 */
async function getYoutubeApiResponse(option, keyword, theme, keyIndex) {
  const keys = process.env.YOUTUBE_TOKEN.split(',');
  const expireTokenError =
  'The request cannot be completed because you have exceeded your <a href="/youtube/v3/getting-started#quota">quota</a>.';

  try {
    const results = (await requestToYoutube(option, keys[keyIndex], keyword)).data.items;

    if (option === 'video') {
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

    if (option === 'channel') {
      return results.map(({ id, snippet }) => ({
        keyword,
        channelId: id.channelId,
        title: snippet.title,
        thumbnail: snippet.thumbnails.default.url,
        url: `https://www.youtube.com/watch?v=${id.videoId}`,
      }));
    }

    return null;
  } catch (e) {
    if (e.message === expireTokenError) {
      return { isExpire: true, tokenCount: keys.length };
    }
    logger.error(`[GET-YOUTUBE-API-RESPONSE] ${e}`);
    throw e;
  }
}

module.exports = {
  getYoutubeApiResponse,
};
