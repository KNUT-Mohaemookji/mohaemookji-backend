const KeywordQuery = require('../queries/keyword');
const keywordDatas = require('../config/keyword.json');
const { logger } = require('../config/logger');

async function updateKeywords() {
  try {
    const types = Object.keys(keywordDatas);

    const datas = types.map((type) => {
      return {
        type,
        keywords: keywordDatas[type],
      };
    });

    datas.forEach(async ({ type, keywords }) => {
      const themes = Object.keys(keywordDatas[type]);
      themes.forEach(async (t) => {
        await KeywordQuery.updateKeywords(t, keywords[t], type);
    })
    });
  } catch (e) {
    logger.error(`[UPDATE-KEWORDS-SERVICE] ${e}`);
  }
}

updateKeywords();
