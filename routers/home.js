const express = require("express");
const homeSchema = require("../models/homeSchema");
const Router = express.Router();

const axios = require("axios");

Router.get("/", async (req, res) => {
  try {
    return res.status(200).send("Welcome to Home Screen");
  } catch (error) {
    return res.status(400).send(err.message);
  }
});
const token = (req, res, next) => {
  try {
    const { ReCaptchaValue } = req.body;

    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${ReCaptchaValue}`;

    axios({
      url: url,
      method: "POST",
    })
      .then(({ data }) => {
        console.log(data);

        if (data.success) {
          res.status(200).json({ message: "Recaptcha Verified" });
        } else {
          res.status(400).json({ message: "Recaptcha verification failed" });
        }
      })
      .catch((e) => {
        res.status(400).json({ message: "Invalid Recaptcha" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

Router.post("/register", token, async (req, res) => {
  try {
    const {
      username,
      email,
      studentNumber,
      phone,
      hackerRankUsername,
      UnstopUsername,
      section,
      branch,
      year,
      gender,
      residence,
    } = req.body;

    const useremail = await homeSchema.findOne({
      email: email,
    });
    if (useremail) {
      console.log("User Already Exists");
      res.json({ success: false, msg: "User already exist" });
    } else {
      try {
        const userData = new homeSchema({
          username,
          email,
          studentNumber,
          phone,
          hackerRankUsername,
          UnstopUsername,
          section,
          branch,
          year,
          gender,
          residence,
        });
        await userData.save();
        res.json({ success: true, msg: "Registered Successfully" });
      } catch (err) {
        console.log(err);
        res.json({ succes: false });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = Router;
