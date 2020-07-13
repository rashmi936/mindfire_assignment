const jwt = require('jsonwebtoken');
const config = require('../config/Config');

class JWTHelper {
    generateToken(userDT) {
        try {
            if (!userDT) { return new Error("payload not define"); }
            /*const token = jwt.sign(userDT, config.JWT.Secret, 
                            {expiresIn: Math.floor(new Date().getTime()/1000) + config.JWT.TokenLife});*/
            const token = jwt.sign(userDT, config.JWT.Secret,
                { expiresIn: Number(config.JWT.TokenLife) });
            const refreshToken = jwt.sign({ emailId: userDT.emailId }, config.JWT.RefreshTokenSecret
                , { expiresIn: Number(config.JWT.RefreshTokenLife) });
            return {
                accessToken: token,
                refreshToken: refreshToken
            }
        } catch (e) {
            throw e;
        }
    };
    getAccessToken(userDT) {
        try {
            if (!userDT) { return new Error("payload not define"); }
            const token = jwt.sign(userDT, config.JWT.Secret,
                { expiresIn: Number(config.JWT.TokenLife) });

            return {
                accessToken: token
            }
        } catch (e) {
            throw e;
        }
    };
    getRefreshToken(userDT) {
        try {
            if (!userDT) { return new Error("payload not define"); }
            const refreshToken = jwt.sign({ emailId: userDT.emailId }, config.JWT.RefreshTokenSecret
                , { expiresIn: Number(config.JWT.RefreshTokenLife) });

            return {
                refreshToken: refreshToken
            }
        } catch (e) {
            throw e;
        }
    };
    /**
     * Generate new access token by refresh token
     * @param {*} userDT 
     */
    generateAccessToken(userDT) {
        try {
            if (!userDT) { return reject("payload not define"); }

            const token = jwt.sign(userDT, config.JWT.Secret, { expiresIn: Number(config.JWT.TokenLife) })
            return {
                accessToken: token
            }
        } catch (e) {
            throw e;
        }
    }
    /**
     * Verify access token 
     * @param {*} accessToken 
     */
    verify(accessToken) {
        try {
            return new Promise((resolve, reject) => {
                if (!accessToken) { return reject("NO_TOKEN_FOUND"); }
                // verifies secret and checks exp
                /*let decodedJwt = jwt.decode(jwtToken, {
                    complete: true
                });
                console.log("token---------------",decodedJwt);*/
                jwt.verify(accessToken, config.JWT.Secret, function (err, decoded) {
                    if (err) {
                        return reject(err);
                    }
                    resolve("VALID");
                });
            })
        } catch (e) {
            throw e;
        }
    }

    forgotPasswordToken(userDT) {
        try {
            if (!userDT) { return new Error("payload not define"); }
            /*const token = jwt.sign(userDT, config.JWT.Secret,  {expiresIn: Math.floor(new Date().getTime()/1000) + config.JWT.TokenLife});*/
            const token = jwt.sign(userDT, config.JWT.Secret, { expiresIn: Number(config.JWT.OTPTokenLife) });
            return token;
        } catch (e) {
            throw e;
        }
    };

    forgotPasswordOtpToken(userDT) {
        try {
            if (!userDT) { return new Error("payload not define"); }
            /*const token = jwt.sign(userDT, config.JWT.Secret,  {expiresIn: Math.floor(new Date().getTime()/1000) + config.JWT.TokenLife});*/
            const token = jwt.sign(userDT, config.JWT.Secret, { expiresIn: Number(config.JWT.OTPTokenLifeForForgotPassword) });
            return token;
        } catch (e) {
            throw e;
        }
    };


    /**
   * Verify Forgot token 
   * @param {*} accessToken 
   */
   verifyForgotPasswordToken(token) {
        try {
            return new Promise( (resolve, reject) => {
                if (!token) { return reject("NO_TOKEN_FOUND"); }

                // verifies secret and checks exp
                jwt.verify(token, config.JWT.Secret, function (err, decoded) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(decoded);
                });
            })
        } catch (e) {
            console.log(e)
            throw e;
        }
    }

    /**
     * Verify refresh token 
     * @param {*} accessToken 
     */
    verifyRefreshToken(refreshToken) {
        try {
            return new Promise((resolve, reject) => {
                if (!refreshToken) { return reject("NO_TOKEN_FOUND"); }
                // verifies secret and checks exp
                jwt.verify(refreshToken, config.JWT.RefreshTokenSecret, function (err, decoded) {
                    if (err) {
                        return reject("INVALID_TOKEN_FOUND");
                    }
                    resolve("VALID");
                });
            })
        } catch (e) {
            throw e;
        }
    }
    getJWTPayload(jwtToken) {
        try {
            let decodedJwt = jwt.decode(jwtToken, {
                complete: true
            });
            return decodedJwt && decodedJwt.payload ? decodedJwt.payload : null;
        } catch (error) {
            return null;
        }
    }

    getJWTDecode(jwtToken) {
        try {
            let decodedJwt = jwt.decode(jwtToken, {
                complete: true
            });
            return decodedJwt ? decodedJwt : null;
        } catch (error) {
            return null;
        }
    }

    encodeToken(payload) {
        return new Promise((resolve,reject)=>{
            try {
                const token = jwt.sign(payload, config.JWT.Secret);
                
                resolve(token);
            } catch (e) {
                console.log(e)
                reject(e);
            }
        })
       
    };

}
module.exports = new JWTHelper();