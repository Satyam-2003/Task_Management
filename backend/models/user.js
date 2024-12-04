const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  task: [
    {
      type: mongoose.Types.ObjectId,
      ref: "task",
    },
  ],
});

module.exports = mongoose.model("user", userSchema);
