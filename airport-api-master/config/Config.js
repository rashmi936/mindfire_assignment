"use strict";
require("dotenv").config();
const env = process.env.NODE_ENV ? process.env.NODE_ENV : "dev"; // 'dev' or 'prod'
const fs = require('fs');
//import app Constant
const appConstant = require("./AppConstant");
//import language
const Message = require("../locale/Message");
const dev = {
  App: {
    Port: process.env.PORT || 8080,
    Http: process.env.HOST || "http://localhost",
  },
  AesSecretKey: "08277A08B0ABA70703E28A5FCED7396D",
  AesSecretIVKey: "D9062EA86462F77E",
  AesSecretKeyConfiguration: "08277A08B0ABA70703E28A5FCED7396D",
  AesSecretIVKeyConfiguration: "D9062EA86462F77E",
  JWT: {
    TokenLife: 60 * 60, // Note: in seconds!,(min*sec)
    OTPTokenLife: 60 * 60,
    OTPTokenLifeForForgotPassword: 2 * 60,
    RefreshTokenLife: 30 * 24 * 60 * 60, // Note: in seconds!, (day*hr*min*sec)
    Secret:
      "QD4Zti88E8XgHwpjmWF2diDQddUlTtiMnD8d4Z4NlAEC0GUgWCxJ7IvU0VOh5BirKWi16QwtA8wv4BciqniuzJjQD5Hg5e20Xn3h1aQgMYh4s05Nbl7WQcfU6CNQHhsTFYWfpGrcfR6xCARdcdo6D6wUkoAL3z1nGDLmVIpHJjdJbZeQ5HtRj0MzOCz9rdXZilcioae2BJ8LPNQMfR95gUVIMLzpRlRbFyqdrwC8kHfhOXUEXKUWDJQXCshdlkkP",
    RefreshTokenSecret:
      "274fmI0L6x0u7dx3ymMtKyGOWSu9H2913Nj9ETrMbcyE5GGeob16m8RVGgwEw3UA0jEKufZjHOsAzksWCB19o3xK2iPEMg5iLU2xrHJtiCG0LkOTwSKBCc1oZTIP5ysnZ96LnNlZfCbM4rABoXOtMaQHPO561PXIl0tjvILj6MqpUe4mWdL1RRkCKm40MQ49LpCfKq03zFu1LEt0sgmkLGgdkEsmCUIowHFDSFoKAsS1TQCelNb8YsNr6iGJKrEg",
  },
Msg: Message,
Constant: appConstant,
  MongoDb: {
    'Database': 'mongodb://localhost:27017/airport'
  },
};

module.exports = dev;
