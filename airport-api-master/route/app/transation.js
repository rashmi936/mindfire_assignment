var express = require('express');
const router = express.Router();
const oAuthServer = require('../../middleware/app/appAuthServer');
const controller = require('../../controller/app/transaction');


router.post('/', oAuthServer.authenticate,controller.add )
router.get('/',oAuthServer.authenticate, controller.list)
router.get('/reverse/:id',oAuthServer.authenticate, controller.reverseTransction)
router.get('/remove-all',oAuthServer.authenticate, controller.removeTransctions)



module.exports = router;
