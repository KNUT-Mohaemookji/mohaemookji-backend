const https = require("https");
const http = require("http");
const express = require("express");
const app = express();
const videoList = require('./src/api/videoList');
const port = 16260;

app.listen(port, () => {
  console.log(`Server Running on ${port} port`);
});

app.use('/', videoList);
