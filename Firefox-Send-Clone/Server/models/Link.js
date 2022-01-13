const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const linkSchema = new Schema({
  url: {
    type: String,
    required: true,
    default: null,
  },
  fileName: {
    type: String,
    required: true,
    default: null,
  },
  content: {
    type: Array,
    required: true,
    default: null,
  },
  downloads: {
    type: Number,
    default: 1,
  },
  author: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    default: null,
  },
  expires: {
    type: Date,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Link", linkSchema);
