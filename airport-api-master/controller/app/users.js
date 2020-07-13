const OauthServer = require('oauth2-server');
var JWT = require('jsonwebtoken');
const Config = require('../../config/Config');
const Util = require('../../util/CustomFunctions');
const authmodel = require('../../authconfig/appOauthConfigModel');
const oauth = new OauthServer({
  model: authmodel
});
const Request = OauthServer.Request;
const Response = OauthServer.Response;
var JWT_SECRET_FOR_ACCESS_TOKEN = 'QD4Zti88E8XgHwpjmWF2diDQddUlTtiMnD8d4Z4NlAEC0GUgWCxJ7IvU0VOh5BirKWi16QwtA8wv4BciqniuzJjQD5Hg5e20Xn3h1aQgMYh4s05Nbl7WQcfU6CNQHhsTFYWfpGrcfR6xCARdcdo6D6wUkoAL3z1nGDLmVIpHJjdJbZeQ5HtRj0MzOCz9rdXZilcioae2BJ8LPNQMfR95gUVIMLzpRlRbFyqdrwC8kHfhOXUEXKUWDJQXCshdlkkP';

/**
 * 
 */

exports.login = async (req, res, next) => {
  const LangMsg = Config.Msg[req.app.get('lang')];
  const request = new Request(req);
  const response = new Response(res);
  oauth.token(request, response)
    .then((token) => {
      var responseBody = { access_token: response.body.access_token, refresh_token: response.body.refresh_token };
      return Util.MakeJsonResponse(res, true, Config.Constant.APIResCode.Success, "", responseBody);
    }).catch(err => {
      let msg = LangMsg.Something_Went_Wrong
      if (err.message == 'USER_NOT_FOUND') {
        msg = LangMsg.InvalidLoginCred;
      }
      else if (err.message == 'INVALID_PASSWORD') {
        msg = LangMsg.InvalidLoginCredPassword;
      }
      else if (err.message == 'INVALID_PASSWORD') {
        msg = LangMsg.InvalidLoginCredPassword;
      }
      return Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.ServerError, Util.FormatException(msg), null);
    });


}







