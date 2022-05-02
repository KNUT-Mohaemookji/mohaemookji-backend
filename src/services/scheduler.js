const schedule = require('node-schedule');
const { logger } = require('../util/logger');
const CookingVideoService = require('./cookingVideo');

// 매일 24시간 간격으로 CookingVideoService.saveCookingVideo()를 실행하도록 스케줄러 구현 예정
// youtube API는 태평양 표준시 자정 (KST 기준 오후 5시)에 할당량이 초기화 된다.
async function collectYoutubeVideo() {
  schedule.scheduleJob('0 5 17 * * *', async () => {
    logger.info('[COLLECT-YOUTUBE-VIDEO] start');
    const result = await CookingVideoService.saveCookingVideo();

    if (!result.result) {
      logger.error(`[COOLECT-YOUTUBE-VIDEO] ${result.code}`);
    }
  });
}

module.exports = {
  collectYoutubeVideo,
};
