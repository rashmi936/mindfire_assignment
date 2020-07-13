
const oauthconfig = require('../config/oAuthConfig');
const Util = require('../util/CustomFunctions');
const Config = require('../config/Config');
const Auth = require('./app/appAuthServer')
verifyAdminClient = async (req, res, next) => {
  try {
    const LangMsg = Config.Msg[req.app.get('lang')];
    let cid = req.headers['client_secret'] ? req.headers['client_secret'] : '';
    let cida = req.headers['client-secret'] ? req.headers['client-secret'] : '';
    let fcid = cida?cida:(cid?cid:'')
    const result = (oauthconfig.ClientIds.admin.AuthKey == fcid);
    if (result) {
      req.headers['Authorization'] = 'Basic ' + fcid;
      next();
    } else {
      return Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.ServerError, LangMsg.InvalidClient, null);
    }
  } catch (err) {
    console.log(err)
  }
}


verifyClient = async (req, res, next) => {
  try {
    const LangMsg = Config.Msg[req.app.get('lang')];
    let cid = req.headers['client_secret'] ? req.headers['client_secret'] : '';
    let cida = req.headers['client-secret'] ? req.headers['client-secret'] : '';
    let fcid = cida?cida:(cid?cid:'')

    const result = (oauthconfig.ClientIds.common.AuthKey == fcid);
    if (result) {
      req.headers['Authorization'] = 'Basic ' + fcid;
      if(req.body.email){
        req.body.email = req.body.email.toLocaleLowerCase()
      }
      next();
    } else {
      return Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.ServerError,LangMsg.InvalidClient , null);
    }
  } catch (err) {
    console.log(err)
  }
}



verifyBothClient = async (req, res, next) => {
  try {
    const LangMsg = Config.Msg[req.app.get('lang')];
    let cid = req.headers['client_secret'] ? req.headers['client_secret'] : '';
    let cida = req.headers['client-secret'] ? req.headers['client-secret'] : '';
    let fcid = cida?cida:(cid?cid:'')
    console.log(req.headers['authorization'])
    const result = (oauthconfig.ClientIds.common.AuthKey == fcid);
    if (result) {
      req.headers['Authorization'] = 'Basic ' + fcid;
      if(req.body.email){
        req.body.email = req.body.email.toLocaleLowerCase()
      }
      next();
    }else if(req.headers['authorization'])
      {
        Auth.authenticate(req,res,next)
      }
        
    else {
      return Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.ServerError,LangMsg.InvalidClient , null);
    }
  } catch (err) {
    console.log(err)
  }
}


module.exports = {
  verifyAdminClient, 
  verifyClient,
  verifyBothClient
}
