const mongoose = require("mongoose");

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
  dishname: {
    type: String,
    required: true,
  },

  dish: {
    type: String,
    required: true,
  },
 
});
const USER = mongoose.model("USER", userSchema);
module.exports = USER;
