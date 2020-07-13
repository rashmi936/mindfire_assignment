'use strict';
// get the packages we need
const express = require('express'), //use to define framework
  app = express(), //taking express object for whole project
  bodyParser = require('body-parser'), //it is use to handle post reuqests
  cors = require('cors'),
  Util = require('./util/CustomFunctions'), // used custom function
  Config = require('./config/Config');
    require('./config/mongooseDb');
const path = require('path');
var logger = require('morgan');
// ====================================
// Route need to allow cross origin
// ====================================
const CorsOptions = {
  origin: '*',//Config.OriginWhiteList,
  credentials: true
};
app.use(logger('dev'));

app.use(cors(CorsOptions));
// use body parser so we can get info from POST and/or URL parameters
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  parameterLimit: 100000,
  limit: '500mb',
  extended: true
}));

// parse application/json
app.use(bodyParser.json());
// app.use(bodyParser.json({ type: 'application/*+json' }));

// Require static assets from public folder
app.use(express.static(path.join(__dirname, 'views')));
app.set('views', path.join(__dirname, 'views'));

// Set view engine as EJS
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');




app.get('/', (req, res) => {
  res.send('<center><h2><b>Hi, This is Server.<br><i> How can i help you ;)</i></b></h2></center>');
});
//Route Start



var AppRoutes = require('./route/AppRoutes');
//adding middleware for api v1

//set default language
app.use(function (req, res, next) {
  app.set('lang', 'en');
  next();
});
app.use('/app', AppRoutes);


app.use(function (req, res, next) {
  const LangMsg = Config.Msg[req.app.get("lang")];
  Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.NotFound, Util.FormatException(LangMsg.RouteNotAllowed.replace('<<<url>>>', req.url)), null);
  return;
});

process.on(
  'uncaughtException',
  function (err) {
    let stack = err.stack;
    //console.log('uncaughtException=====>', stack);
  }
);
// cathc errors and save as file in log folder
process
  .on('uncaughtException', function (err) {
    let stack = err.stack;
    //console.log('uncaughtException=====>', stack);
  })
  .on('unhandledRejection', (reason, p) => {
    //console.error(reason, 'Unhandled Rejection at Promise', p);
  });

module.exports = app;