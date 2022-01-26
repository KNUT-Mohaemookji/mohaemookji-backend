const express = require('express');
const { isValidObjectId } = require('mongoose');
const videoList = require('./src/api/videoList');

const app = express();
const port = 16260;

app.listen(port, () => {
  console.log(`Server Running on ${port} port`);
});

app.use('/', videoList);
