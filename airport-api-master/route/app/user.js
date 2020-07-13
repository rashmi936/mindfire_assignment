var express = require('express');
const router = express.Router();
const users = require('../../controller/app/users');
const Util = require('../../util/CustomFunctions')
const authmiddleware = require('../../middleware/auth')


router.post('/login',Util.allowJson, authmiddleware.verifyClient, users.login)
router.post('/refresh-token', Util.allowJson,authmiddleware.verifyClient,  users.login);

module.exports = router;