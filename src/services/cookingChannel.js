/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const { logger } = require('../util/logger');
const YoutubeApiService = require('../util/youtubeApi');
const CookingChannelQuery = require('../queries/cookingChannel');
const keywordQuery = require('../queries/keyword');
const configQuery = require('../queries/config');

async function getRandomCookingChannel() {
  return CookingChannelQuery.getRandomCookingChannel();
}

async function saveCookingChannel() {
  const option = 'channel';
  const type = 'cooking';

  try {
    const tokenCount = (await configQuery.readConfig('tokenCount')).value;
    const themes1 = (await configQuery.readConfig(type)).value.themes;
    let tokenIndex = 0;

    for (const theme of themes1) {
      const keywords1 = (await keywordQuery.readKeywords(theme, type)).keywords;

      for (const keyword of keywords1) {
        try {
          // 모든 token을 다 사용한 경우 로직을 끝낸다.
          if (tokenIndex > tokenCount) {
            return { result: false, code: 'allTokensExpired' };
          }

          const apiResult = await YoutubeApiService.getYoutubeApiResponse(
            option,
            keyword,
            theme,
            tokenIndex,
          );

          // token이 만료된 경우 다음 토큰을 사용하기 위해 에러메시지를 던진다.
          if (apiResult.isExpire && tokenIndex < tokenCount) {
            throw new Error('tokenExpire');
          }

          await CookingChannelQuery.saveCookingChannel(apiResult);
        } catch (e) {
          // 에러메시지가 token이 만료됨을 알리는 메시지라면 다음 토큰을 사용하도록 인덱스를 조정한다.
          if (e.message === 'tokenExpire' && tokenIndex < tokenCount) {
            logger.error(`[SAVE-COOKING-Channel-SERVICE] expire token index = ${tokenIndex}`);
            tokenIndex += 1;
          } else {
            return { result: false, code: 'otherError' };
          }
        }
      }
    }

    logger.info('[SAVE-COOKING-Channel-SERVICE] Success');
    return { result: true };
  } catch (e) {
    logger.error(`[SAVE-COOKING-Channel-SERVICE] ${e}`);
    return { result: false };
  }
}

module.exports = {
  getRandomCookingChannel,
  saveCookingChannel,
};
