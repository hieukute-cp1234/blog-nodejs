const mongoose = require("mongoose");
const SERVER = require("../constants/server");

const connect = async () => {
  try {
    await mongoose.connect(SERVER.DB_KEY, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connect db successfully!");
  } catch (error) {
    console.log("connect db failue!");
  }
};

module.exports = connect;
