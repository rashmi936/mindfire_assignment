const _ = require('lodash');
var JWT = require('jsonwebtoken');
const oauthconfig = require('../config/oAuthConfig');
const UserModel = require('../model/app/users');
const bcrypt = require('bcrypt-nodejs');
const { concatSeries } = require('async');

var JWT_ISSUER = oauthconfig.oAuthConfig.JWT_SECRET_FOR_ACCESS_TOKEN;
var JWT_SECRET_FOR_ACCESS_TOKEN = oauthconfig.oAuthConfig.JWT_SECRET_FOR_ACCESS_TOKEN;
var JWT_SECRET_FOR_REFRESH_TOKEN = oauthconfig.oAuthConfig.JWT_SECRET_FOR_REFRESH_TOKEN;
var JWT_ACCESS_TOKEN_EXPIRY_SECONDS = oauthconfig.oAuthConfig.JWT_ACCESS_TOKEN_EXPIRY_SECONDS; // 30 minutes
var JWT_REFRESH_TOKEN_EXPIRY_SECONDS = oauthconfig.oAuthConfig.JWT_REFRESH_TOKEN_EXPIRY_SECONDS; // 14 days

/**
 * @name Generate Access token 
 * @param {*} client 
 * @param {*} user 
 * @param {*} scope 
 */

generateAccessToken = (client, user, scope) => {
  let token, secret, exp = new Date();
  let payload = {
    id: user._id,
    name: user.name,
    email: user.email
  };
  let options = {};
  secret = JWT_SECRET_FOR_ACCESS_TOKEN;
  exp.setSeconds(exp.getSeconds() + JWT_ACCESS_TOKEN_EXPIRY_SECONDS);
  payload.exp = exp.getTime();
  token = JWT.sign(payload, secret, options);
  return token;
}


/**
 * Generate refresh token 
 * @param {*} client 
 * @param {*} user 
 * @param {*} scope 
 */
generateRefreshToken = (client, user, scope) => {
  let token;
  let secret;
  let exp = new Date();
  let payload = {
    id: user._id,
    name: user.name,
    email: user.email,
    isDoctor: user.isDoctor
  };
  let options = {};
  secret = JWT_SECRET_FOR_REFRESH_TOKEN;
  exp.setSeconds(exp.getSeconds() + JWT_REFRESH_TOKEN_EXPIRY_SECONDS);
  payload.exp = exp.getTime();
  token = JWT.sign(payload, secret, options);
  return token;
}



/**
 * verify access token with Jwt
 * @param {*} accessToken 
 */

getAccessToken = async (accessToken) => {
  const decode = await JWT.verify(accessToken, JWT_SECRET_FOR_ACCESS_TOKEN)
  if (!decode) {
    return false;
  }
  return {
    accessToken,
    accessTokenExpiresAt: new Date(decode.exp),
    user: decode,
    client: {},
    scope: '*'
  };
}


/**
 * varify refresh token with Jwt
 * @param {*} refreshToken 
 */
getRefreshToken = async (refreshToken) => {
  const decode = await JWT.verify(refreshToken, JWT_SECRET_FOR_REFRESH_TOKEN)
  if (!decode) {
    return false;
  }
  return {
    refreshToken,
    refreshTokenExpiresAt: new Date(decode.exp),
    user: decode,
    client: {
      id: oauthconfig.ClientIds.common.client_id
    },
    scope: '*'
  };

}



/**
 * check client detail with clientId & client Secert
 * @param {*} clientId 
 * @param {*} clientSecret 
 */

getClient = (clientId, clientSecret) => {


  return new Promise((resolve, reject) => {
    let grants = ['authorization_code', 'password', 'refresh_token', 'client_credentials'];
    if (clientId === oauthconfig.ClientIds.common.client_id && clientSecret === oauthconfig.ClientIds.common.client_secret) {
      let result = (oauthconfig.ClientIds.common.client_id ?
        Object.assign(oauthconfig.ClientIds.common.client_id, {
          id: oauthconfig.ClientIds.common.client_id,
          grants: grants,
          client_type: 'common'
        }) : null);

      resolve(result);
    }
    else {
      reject('client Id not match')
    }
  });
}


/**
 * @author Techahead
 * @name      login with email and password match
 * @param {*} username 
 * @param {*} password 
 * 
 */
getUser = async (username, password) => {
  try {
    return new Promise(async (resolve, reject) => {
      const userData = await UserModel.findOne({ email:username });

      console.log(userData);
      if ((userData)) {
           await bcrypt.compare(password, userData.password,(err,result) =>{
            if (result) {
              resolve(userData);
            } else {
              reject('INVALID_PASSWORD')
            }
          })
      
      } else {
        reject('USER_NOT_FOUND')
      }
    });
  } catch (err) {
    console.log(err)
  }


}




revokeAuthorizationCode = (code) => {
  return true;
}

revokeToken = (token) => {
  return true;
}


saveToken = (token, client, user) => {
  return Object.assign({
    client,
    user
  }, token);

}

getAuthorizationCode = (code) => {
  return true
}

saveAuthorizationCode = (code, client, user) => {
  return true;
}

getUserFromClient = (client) => {
  return true;
}


/**
In case there is a need to scopes for the user, uncomment the code.
It will also be required to provide scopes for both user and client
*/
// eslint-disable-next-line
validateScope = (user, client, scope) => {
  return '*';
}

/**
In case there is a need to scopes for the user, uncomment the code.
It will also be required to provide scopes for both user and client (They should also match)
*/
// eslint-disable-next-line
verifyScope = (token, scope) => {
  // console.log('verifyScope', token, scope);
  // return token.scope === scope;
  return true;
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  getAccessToken,
  getAuthorizationCode,
  getClient,
  getRefreshToken,
  getUser,
  // getUserFromClient,
  revokeAuthorizationCode,
  revokeToken,
  saveToken,
  saveAuthorizationCode,
  validateScope,
  verifyScope
};