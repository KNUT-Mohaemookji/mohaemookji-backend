const router = require("express").Router();
const videoList = require("../services/videoList");

router.get("/", (req, res) => {
  res.send(videoList.getAllRandomVideo());
});

module.exports = router;
