var express = require('express');
const router = express.Router();
const oAuthServer = require('../../middleware/app/appAuthServer');
const controller = require('../../controller/app/airport');


router.post('/', oAuthServer.authenticate,controller.add )
router.get('/',oAuthServer.authenticate, controller.list)


module.exports = router;
