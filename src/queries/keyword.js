const { keywordModel } = require('../models/keyword');

/**
 * youtube Data API의 쿼리를 위한 검색어를 저장하기 위해 Keyword 컬렉션의 데이터를 업데이트 한다.
 *
 * @param {string} theme 검색어 모음의 소분류 (ex: cooking의 meal, snack, diet 등...)
 * @param {array} keywords 검색어 모음
 * @param {string} type 검색어 모음의 대분류 (ex: cooking...)
 */
async function updateKeywords(theme, keywords, type) {
  try {
    await keywordModel.updateOne({ theme }, { theme, keywords, type }, { new: true, upsert: true });
  } catch (e) {
    throw new Error(e);
  }
}

/**
 * youtube Data API의 쿼리를 위한 검색어를 불러온다.
 *
 * @param {string} theme 검색어 모음의 소분류 (ex: cooking의 meal, snack, diet 등...)
 * @param {string} type 검색어 모음의 대분류 (ex: cooking...)
 */
async function readKeywords(theme, type) {
  try {
    return keywordModel.findOne({ theme, type });
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  updateKeywords,
  readKeywords,
};
