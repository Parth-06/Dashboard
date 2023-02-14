const mongoose = require("mongoose");

const uploadShema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Age: {
    type: String,
    required: true,
  },
  Gender: {
    type: String,
    required: true,
  },
  Owner: {
    type: String,
  },
});

const uploadcsv = mongoose.model("csvs", uploadShema);

module.exports = uploadcsv;
