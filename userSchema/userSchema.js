const mongoose = require("mongoose");

// filename
// filePath
// fileType
// filesize

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  Bookname: {
    type: String,
    required: true,
  },

  Book: {
    type: String,
    required: true,
  },
  Authername: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,
    required: true,
  },
  filesize: {
    type: String,
    required: true,
  },
});
const USER = mongoose.model("USER", userSchema);
module.exports = USER;
