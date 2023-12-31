const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  profileImage: {
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
  gender: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  deactivated: {
    type: String,
    default: null,
  },
  followers: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  followings: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
});

const User = new mongoose.model("User", userSchema);

module.exports = { User };
