const mongoose = require("mongoose");

const dbUrl =
  process.env.MONGODB_CONNECTION || "mongodb://db:27017/mohaemookji";

const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(dbUrl, connectOptions);
const db = mongoose.connection;

db.on("error", (err) => {
  throw new Error(`${err}`);
});

db.once("open", () => console.log("Database connected."));

module.exports = db;
