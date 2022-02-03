const models = require('../models');

const dbCtrls = {
  vModels: Object.values(models.Videos),
  cModel: models.Channel,

  fnSaveVideos: async function (_nArrObjVData)
  {
    try {
      process.stdout.write('Saved video index: '); // Temp
      const nArrObjLen = _nArrObjVData.length;
      for (let i=0; i<nArrObjLen; ++i) {
        const arrObjVData = _nArrObjVData[i];
        await Promise.all(arrObjVData.map((obj, j) => {
          const videoDoc = new this.vModels[i](obj);
          videoDoc.save(err => err ? console.error(err.message) : process.stdout.write(`${j} `));
        }));
      }
      console.log(1);
      console.log(1);
      console.log(1);
      console.log(1);
      console.log(1);
    } catch (err) {
      console.error(`Error in dbc.fnSaveVideos:\n${err}`);
    }
  },
  fnSaveChannels: async function (_arrObjCData)
  {
    try {
      process.stdout.write('Saved channel index: '); // Temp
      await Promise.all(_arrObjCData.map((obj, i) => {
        const channelDoc = new this.cModel(obj);
        channelDoc.save(err => err ? console.error(err.message) : process.stdout.write(`${i} `));
      }));
    } catch (err) {
      console.error(`Error in dbc.fnSaveChannels:\n${err}`);
    }
  },
}

module.exports = dbCtrls;