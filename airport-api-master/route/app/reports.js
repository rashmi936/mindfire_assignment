var express = require('express');
const router = express.Router();
const oAuthServer = require('../../middleware/app/appAuthServer');
const controller = require('../../controller/app/reports');


router.get('/airport',oAuthServer.authenticate, controller.airport)
router.get('/fuel',oAuthServer.authenticate, controller.fuel)

// router.get('/',oAuthServer.authenticate, controller.list)




module.exports = router;
