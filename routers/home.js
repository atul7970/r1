const express = require("express");
const homeSchema = require("../models/homeSchema");
const Router = express.Router();
const request = require("request");
const axios = require("axios");
const SECRET_KEY = process.env.SK;
Router.get("/", async (req, res) => {
  try {
    return res.status(200).send("Welcome to Home Screen");
  } catch (error) {
    return res.status(400).send(err.message);
  }
});
const token = (req, res, next) => {
  if (
    req.body.reCaptchaValue === undefined ||
    req.body.reCaptchaValue === "" ||
    req.body.reCaptchaValue === null
  ) {
    return res.json({ success: false, msg: "Please select captcha" });
  }
  const secretkey = process.env.SK;
  const verifyurl =
    "https://google.com/recaptcha/api/siteverify?secret=${secretkey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}";
  request(verifyurl, (err, response, body) => {
    body = JSON.parse(body);

    if (body.success !== undefined && !body.success) {
      return res.json({ success: false, msg: "Failed captcha verification" });
    }
    return res.json({ success: true, msg: "Captcha passed" });
  });
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
