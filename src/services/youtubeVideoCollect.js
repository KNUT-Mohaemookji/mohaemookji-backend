// Mode
const env = process.env.NODE_ENV;
const TOKENS = process.env.YOUTUBE_TOKEN;
const envFile = env === 'production' ? '.env' : 'mh.env';

// Modules
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const appRoot = require('app-root-path');
require('dotenv').config({ path: path.resolve(`${appRoot}`, envFile) });

// loaders
const logger = require('../config/logger');
const youtubeApiSearchOption = require('../config/youtubeVideoCollect');
const db = require('../queries/dbConnect');
const youtubeVideoCollectQuery = require('../queries/youtubeVideoCollect');
const channelModel = require('../models/channel');
const videoModels = require('../models/videos');
const apiCtrl = require('../controller/apiController');
const dbCtrl = require('../controller/dbController');

function getYoutubeTokenKeys() {
  const yotubeTokenDatas = TOKENS.split(',');
  const youtubeTokenKeys = yotubeTokenDatas[new Date().getDate() % yotubeTokenDatas.length];

  youtubeTokenKeys.forEach((key) => {
    logger.info(`use youtube api key : ${key}`);
  });
  return youtubeTokenKeys;
}
// Business logic
const fnReqSearchData = async (_youtube, _arrQuery, _vModel) => {
  try {
    const arrQLen = _arrQuery.length;

    const arrObjSData = [];

    for (let i = 0; i < arrQLen; ++i) {
      const q = _arrQuery[i];
      const arrItem = await apiCtrl.fnReqSearchList(_youtube, q);
      console.log(2);
      console.log(2);
      console.log(2);
      console.log(2);
      console.log(2);
      const arrILen = arrItem.length;
      if (arrILen === 0) return;
      const arrVId = [];
      for (let j = 0; j < arrILen; ++j) {
        const { id } = arrItem[j];
        if (id.kind === 'youtube#video' && id.videoId) arrVId.push(id.videoId);
      }

      process.stdout.write('vID 중복 제거: ');
      const arrFVId = await Promise.all(arrVId.filter(async (vId) => {
        const isV = !await _vModel.findOne({ id: vId });
        if (!isV) process.stdout.write(`${vId} `);
        return isV;
      }));
      console.log();
      const strVIds = arrFVId.join(',');
      console.log('STR VIDS: ', strVIds);

      arrObjSData.push({
        reqQ: q,
        resIds: strVIds,
      });
    }

    return arrObjSData;
  } catch (err) {
    console.error(`Error in fnReqSearchData:\n${err}`);
  }
};

const fnReqVideoData = async (_youtube, _arrObjSData) => {
  try {
    const nArrObjResVData = await Promise.all(_arrObjSData.map(async (obj) => {
      const arrObjResVData = await apiCtrl.fnReqVideosData(_youtube, obj.reqQ, obj.resIds);
      return arrObjResVData;
    }));

    const arrObjVData = [];
    for (const arrObjResVData of nArrObjResVData) {
      arrObjVData.push(...arrObjResVData);
    }
    return arrObjVData;
  } catch (err) {
    console.error(`Error in fnReqVideoData:\n${err}`);
  }
};

const fnExtractChannelId = (_nArrObjVData) => {
  try {
    const arrCId = [];
    for (const arrObjVData of _nArrObjVData) {
      arrCId.push(...arrObjVData.map((obj) => obj.channelId));
    }
    return arrCId;
  } catch (err) {
    console.error(`Error in fnExtractChannelId:\n${err}`);
  }
};

const fnReqChannelData = async (_youtube, _arrCId) => {
  try {
    process.stdout.write('cID 중복 제거: ');
    const arrCId = await Promise.all(_arrCId.filter(async (cId) => {
      const isC = !await models.Channel.findOne({ id: cId });
      if (!isC) process.stdout.write(`${cId} `);
      return isC;
    }));
    console.log();
    const strCIds = arrCId.join(',');
    console.log('STR CIDS: ', strCIds);

    if (strCIds === '') return null;

    const arrObjCData = await apiCtrl.fnReqChannelsData(_youtube, strCIds);
    return arrObjCData;
  } catch (err) {
    console.error(`Error in fnReqChannelData:\n${err}`);
  }
};

const fnRequest = async () => {
  try {
    const youtube = google.youtube('v3');

    // 검색어 로드
    const qList = queryJob.fnGetQueries();

    const nArrQ = Object.values(qList);
    const nArrQLen = nArrQ.length;

    // 비디오 주제 별 모델을 배열 형태로 로드
    const videoModels = Object.values(models.Videos);

    // 검색어 주제 별로 로직 동작
    const nArrObjVData = [];

    for (let i = 0; i < nArrQLen; ++i) {
      let arrQuery = nArrQ[i];
      queryJob.fnShuffleData(arrQuery);
      arrQuery = arrQuery.slice(0, 2);

      const arrObjSData = await fnReqSearchData(youtube, arrQuery, videoModels[i]); // 검색 데이터 요청
      if (arrObjSData === undefined && typeof arrObjSData === undefined) {
        console.log('No data.');
        process.exit(0);
      }

      const arrObjVData = await fnReqVideoData(youtube, arrObjSData); // 비디오 데이터 요청

      nArrObjVData.push(arrObjVData);
    }

    const arrCId = fnExtractChannelId(nArrObjVData); // 채널 아이디 추출
    const arrObjCData = await fnReqChannelData(youtube, arrCId); // 채널 데이터 요청

    await dbCtrl.fnSaveVideos(nArrObjVData);
    await dbCtrl.fnSaveChannels(arrObjCData);
  } catch (err) {
    console.error(`Error in fnRequest:\n${err}`);
    if (db) {
      db.close();
    }
  }
};

(async () => {
  await fnRequest();
})();

module.exports = {
  getYoutubeTokenKeys,
};
