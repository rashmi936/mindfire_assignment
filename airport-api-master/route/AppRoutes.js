var express = require('express');
const router = express.Router();
const airport =  require('./app/airport')
const aircraft =  require('./app/aircraft')
const transcation =  require('./app/transation')
const reports =  require('./app/reports')
const user =  require('./app/user')






router.use('/user',user)
router.use('/airport',airport)
router.use('/aircraft',aircraft)
router.use('/transcation',transcation)
router.use('/report',reports)



 module.exports = router;
