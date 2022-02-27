const searchKeywordQuery = require('../queries/searchKeywordQuery');

const { logger } = require('../config/logger');
const searchWordList = require('./searchWordList.json');

// YVC 기능이 실행되게 하기 위해 json 파일을 읽어들여 검색어를 DB에 저장한다
// 검색어는 중복이 되지 않도록 해야한다
async function createSearchKeyword() {
  const topics = Object.keys(searchWordList);

  logger.info(`검색어 : ${JSON.stringify(topics)}`);

  // FIX 임시로 아래와 같이 설정
  const result = searchKeywordQuery.getData('snack', { query: '케이크' });

  logger.info(result);
}

module.exports = {
  createSearchKeyword,
};
