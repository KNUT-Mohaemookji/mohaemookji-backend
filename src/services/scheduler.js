const { logger } = require('../util/logger');
const CookingVideoService = require('./cookingVideo');

// 매일 24시간 간격으로 CookingVideoService.saveCookingVideo()를 실행하도록 스케줄러 구현 예정
// youtube API는 태평양 표준시 자정 (KST 기준 오후 5시)에 할당량이 초기화 된다.
async function collectYoutubeVideo() {
  const result = await CookingVideoService.saveCookingVideo();
  logger.info(result);
}

module.exports = {
  collectYoutubeVideo,
};
