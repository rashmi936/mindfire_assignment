const OauthServer = require('oauth2-server');
const authmodel = require('../../authconfig/appOauthConfigModel');
const Util = require('../../util/CustomFunctions')
const bcrypt = require('bcrypt-nodejs');
const Config = require('../../config/Config')
// const  = require('../../loca')
const oauth = new OauthServer({
  model: authmodel
});



/**
 *    Authentication check function
 */
authenticate = (req, res, next) => {

  const LangMsg = Config.Msg[req.app.get('lang')];
  const Request = OauthServer.Request;
  const Response = OauthServer.Response;
  const request = new Request(req);
  const response = new Response(res);
  oauth.authenticate(request, response)
    .then((token) => {

      req.user = token.user;
      next();
    })
    .catch((err) => {
      console.log(err);
      return Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.ServerError, LangMsg.Unauthorized, null);
    });
};


module.exports = {
  authenticate
}