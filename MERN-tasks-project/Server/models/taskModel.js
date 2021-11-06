const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
});

module.exports = mongoose.model("Task", Schema);
