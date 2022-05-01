const { logger } = require('../config/logger');
const { keywordModel } = require('../models/keyword');

async function updateKeywords(theme, keywords, type) {
  try {
    await keywordModel.updateOne({ theme }, { theme, keywords, type }, { new: true, upsert: true });
  } catch (e) {
    logger.error(`[UPDATE-KEYWORDS-QUERY] ${e}`);
  }
}

module.exports = {
  updateKeywords,
};
