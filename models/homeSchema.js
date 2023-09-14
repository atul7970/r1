const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  student_no: {
    type: Number,
  },
  phone: {
    type: String,
    default: "0000000000",
  },

  hackerRankUsername: {
    type: String,
    required: true,
    unique: true,
  },
  UnstopUsername: {
    type: String,
    required: true,
    unique: true,
  },
  section: {
    type: Number,
    enum: [1, 2, 3],
  },
  branch: {
    type: String,
    enum: [
      "CSE",
      "CS",
      "CSIT",
      "IT",
      "AIML",
      "CSE-AIML",
      "CSE-DS",
      "CSE(Hindi)",
      "EN",
      "MECH",
      "CIVIL",
      "ECE",
      "CSE-HINDI",
    ],
  },
  year: {
    type: Number,
    enum: [2],
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Others"],
  },
  residence: {
    type: String,
    enum: ["Hosteller", "Dayscholar"],
  },
  reCaptchaValue: {
    type: String,
  },

});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
