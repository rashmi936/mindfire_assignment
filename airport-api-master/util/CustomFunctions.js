const promise = require('promise');
const Config = require('../config/Config');
const crypto = require('crypto');
const bcrypt = require('bcrypt-nodejs');
const saltRounds = 'V1';
const mongoose = require('mongoose');

randomString = async (count = 1) => {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (var j = 0; j < count; j++) {
		for (var i = 0; i < 9; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length)) + j;
		}
	}

	return text;
}





replaceArrayOfString = function (string, find, replace) {
	var replaceString = string;
	var regex;
	return new promise(function (resolve, reject) {
		if (find.length > 0 && replace.length > 0 && string != "") {

			each(find, function (item, next) {
				var indexof = find.indexOf(item);
				regex = new RegExp(item, "g");
				replaceString = replaceString.replace(regex, replace[indexof]);
				next(null, item);
			}, function (err, transformed) {
				resolve(replaceString);
			});
		} else {
			resolve(replaceString);
		}
	});
};

getRandomInteger = function (min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

/*
* Method: ConvertInt
* Purpose: To convert data in javascript number type
* @param {*} value
* @response {*} number type value
*/
ConvertInt = function (value) {
	try {
		if (typeof (value) == "number") {
			return Number(value);
		} else {
			value = value ? value : '';
			value = value.replace(/[^0-9]/g, '');
			return isNaN(Number(value)) ? 0 : Number(value);
		}
	} catch (e) {
		return '';
	}
};

ConvertBool = function (value) {
	let res = false;
	try {
		value = value ? value : false;
		if (typeof (value) == "number") {
			value = Number(value);
		} else if (typeof (value) == "boolean") {
			//value = (value);
		} else if (typeof (value) == "string") {
			value = (value).toString();
		} else {
			value = (value ? value : "").toString();
			value = value.replace(/[^0-9]/g, '');
			value = isNaN(Number(value)) ? 0 : Number(value);
		}
		switch (value) {
			case 1: res = true;
				break;
			case 0: res = false;
				break;
			case "false": res = false;
				break;
			case "true": res = true;
				break;
			case 'false': res = false;
				break;
			case 'true': res = true;
				break;
			case false: res = false;
				break;
			case true: res = true;
				break;
		}
		return res;
	} catch (e) {
		return res;
	}
};

generateRandomKey = function () {
	return Math.random()
		.toString(36)
		.substring(7);
};



MakeJsonResponse = function (res, successStatus, statusCode, message, result, appVersion) {
	res.status(statusCode).json({
		"status": successStatus,
		"message": message,
		"data": result ? result : {}
	});
};

daysdifference = function (date1, date2) {
	// The number of milliseconds in one day
	var ONEDAY = 1000 * 60 * 60 * 24;
	// Convert both dates to milliseconds
	var date1_ms = date1.getTime();
	var date2_ms = date2.getTime();
	// Calculate the difference in milliseconds
	var difference_ms = Math.abs(date1_ms - date2_ms);

	// Convert back to days and return
	return Math.round(difference_ms / ONEDAY);
}

CheckNull = function (Input) {
	return (Input == null) ? "" : Input;
}

customTrim = function (x) {
	try {
		return x.replace(/^\s+|\s+$/gm, '');
	} catch (e) {
		return '';
	}
}

FormatException = function (Error, Exception) {
	try {
		Error = Error ? Error : '';
		Exception = (Exception && Exception.stack) ? Exception.stack : Exception;
		Error = typeof (Error) == "string" ? Error : JSON.stringify(Error ? Error : '');
		Exception = Exception && Exception != "" ? (JSON.stringify(Exception ? Exception : '')) : "";
		if (Exception) {
			return Error + (Exception && Exception != "" ? " " : "") + (Exception && Exception != "" ? Exception : "");
		} else {
			return Error;
		}
	} catch (e) {
		return Error ? Error : "";
	}
},
	/**
	 * Method: SaveException
	 * Purpose: Save Error Logs to noSql
	 * @param {*} FileName 
	 * @param {*} Method 
	 * @param {*} Exception 
	 */
	SaveException = function (FileName, Method, Exception) {
		try {
			//console.log("SaveException error Method  --->>>>>", Method);
			//console.log("SaveException error try  --->>>>>", Exception);
			FileName = JSON.stringify(FileName ? FileName : '');
			Method = JSON.stringify(Method ? Method : '');
			let newExp = new Error(Exception);
			newExp = (newExp ? (newExp.message ? newExp.message : newExp) : '');
			console.log(newExp)
		} catch (e) {
			console.log("SaveException error catch  --->>>>>", e);
		}
	}

FormatJoiError = function (error, LangMsg) {
	try {
		let errorType = error.details[0]["type"];
		var msg = "";
		
		switch (errorType) {
			
			case "object.allowUnknown":
				if (LangMsg) {
					msg = error.details[0]['context']["label"].toString() + " " + LangMsg.PostfixAllowUnknownError;
					msg = msg.trim();
				} else {
					msg = error.details[0]['message'].toString();
					msg = msg.trim();
				}
				break;
			case "any.allowOnly":
				msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
				msg = msg.substring(2).trim();
				msg = error.details[0]['context']["label"].toString().trim() + " " + msg;
				msg = msg.trim();
				break;
			case "any.empty":
				msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
				msg = msg.substring(2).trim();
				msg = error.details[0]['context']["label"].toString().trim() + " " + msg;
				msg = msg.trim();
				break;
			case "any.required":
				msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
				msg = msg.substring(2).trim();
				msg = error.details[0]['context']["label"].toString().trim() + " " + msg;
				msg = msg.trim();
				break;
			case "object.base":
				msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
				msg = msg.substring(2).trim();
				msg = error.details[0]['context']["label"].toString().trim() + " " + msg;
				msg = msg.trim();
				break;
			case "number.base":
				msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
				msg = msg.substring(2).trim();
				msg = error.details[0]['context']["label"].toString().trim() + " " + msg;
				msg = msg.trim();
				break;
			case "string.base":
				msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
				msg = msg.substring(2).trim();
				msg = error.details[0]['context']["label"].toString().trim() + " " + msg;
				msg = msg.trim();
				break;
			case "string.alphanum":
				msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
				msg = msg.substring(2).trim();
				msg = error.details[0]['context']["label"].toString().trim() + " " + msg;
				msg = msg.trim();
				break;
			case "string.max":
				msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
				msg = msg.substring(2).trim();
				msg = error.details[0]['context']["label"].toString().trim() + " " + msg + " " + error.details[0]['context']["limit"].toString().trim();
				msg = msg.trim();
				break;
			case "string.min":
				msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
				msg = msg.substring(2).trim();
				msg = error.details[0]['context']["label"].toString().trim() + " " + msg + " " + error.details[0]['context']["limit"].toString().trim();
				msg = msg.trim();
				break;
			case "string.email":
				console.log(LangMsg.PostfixInvalidEmailId)
				if (LangMsg.PostfixInvalidEmailId) {
					msg = LangMsg.PostfixInvalidEmailId;
					msg = msg.trim();
				} else {
					msg = error.details[0]['message'].toString();
					msg = msg.trim();
				}
				break;
				// msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
				// msg = msg.substring(2).trim();
				// msg = error.details[0]['context']["label"].toString().trim() + " " + msg;
				// msg = msg.trim();
				// break;
			case "boolean.base":
				msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
				msg = msg.substring(2).trim();
				msg = error.details[0]['context']["label"].toString().trim() + " " + msg;
				msg = msg.trim();
				break;
			case "number.max":
				msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
				msg = msg.substring(2).trim();
				msg = error.details[0]['context']["label"].toString().trim() + " " + msg + " " + error.details[0]['context']["limit"].toString().trim();
				msg = msg.trim();
				break;
			case "number.min":
				msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
				msg = msg.substring(2).trim();
				msg = error.details[0]['context']["label"].toString().trim() + " " + msg + " " + error.details[0]['context']["limit"].toString().trim();
				msg = msg.trim();
				break;
			case "array.max":
				msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
				msg = msg.substring(2).trim();
				msg = error.details[0]['context']["label"].toString().trim() + " " + msg + " " + error.details[0]['context']["limit"].toString().trim();
				msg = msg.trim();
				break;
			default:
				msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
				// msg = msg.substring(2).trim();
				msg = error.details[0]['context']["label"].toString() + msg;
				msg = msg.trim();
				//  msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString(); msg = msg.substring(2).trim();
				break;
		}
		msg = msg.replace(msg[0], msg[0].toUpperCase());
		return msg;
	} catch (e) {
		return e.message;
	}
}
AesEncript = function (planText) {
	try {
		//iv needs to be 16bytes long, key is 32bytes. And we changed createCipher to createCipheriv.
		let iv = Buffer.from(Config.AesSecretIVKey);
		let key = Buffer.from(Config.AesSecretKey);
		let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
		let encryptedData = cipher.update(planText, 'utf8', 'hex') + cipher.final('hex');
		return encryptedData;
	} catch (e) {
		return '';
	}

}
AesDecript = function (encryptedText) {
	try {
		//iv needs to be 16bytes long, key is 32bytes. And we changed createCipher to createCipheriv.
		encryptedText = encryptedText.toString();
		let iv = Buffer.from(Config.AesSecretIVKey);
		let key = Buffer.from(Config.AesSecretKey);
		let cipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
		let encryptedData = cipher.update(encryptedText, 'hex', 'utf8') + cipher.final('utf8');
		return encryptedData;
	} catch (e) {
		return '';
	}
}
EncodeBase64 = function (planText) {
	try {
		let buff = Buffer.from(planText.toString());
		let base64data = buff.toString('base64');
		return base64data;
	} catch (e) {
		return '';
	}
}
DecodeBase64 = function (base64Text) {
	try {
		let data = 'c3RhY2thYnVzZS5jb20=';
		let buff = Buffer.from(base64Text, 'base64');
		let text = buff.toString('ascii');
		return text;
	} catch (e) {
		return '';
	}
}
GetHashText = function (text) {
	try {
		return crypto.createHash('md5').update(text).digest('hex');
	} catch (e) {
		return '';
	}
}

CompareHashText = function (text, hashText) {
	try {
		let newText = crypto.createHash('md5').update(text).digest('hex');
		return newText == hashText;
	} catch (e) {
		return false;
	}
}

AesConfigurationEncrypt = function (planText) {
	try {
		//iv needs to be 16bytes long, key is 32bytes. And we changed createCipher to createCipheriv.
		let iv = Buffer.from(Config.AesSecretIVKeyConfiguration);
		let key = Buffer.from(Config.AesSecretKeyConfiguration);
		let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
		let encryptedData = cipher.update(planText, 'utf8', 'hex') + cipher.final('hex');
		return encryptedData;
	} catch (e) {
		return '';
	}

}
GenerateOTP = function (otpLength) {
	try {
		/*// Declare a digits variable  
	  // which stores all digits 
	  let len=otpLength?otpLength:Config.OTPLength;
	  var digits = '0123456789'; 
	  let OTP = ''; 
	  for (let i = 0; i < len; i++ ) { 
		  OTP += digits[Math.floor(Math.random() * 10)]; 
	  } 
	  return Number(OTP);
	  */
		return Math.floor(1000 + Math.random() * 9000);
	} catch (e) {
		return null;
	}

}
AesConfigurationDecrypt = function (encryptedText) {
	try {
		//iv needs to be 16bytes long, key is 32bytes. And we changed createCipher to createCipheriv.
		encryptedText = encryptedText.toString();
		let iv = Buffer.from(Config.AesSecretIVKeyConfiguration);
		let key = Buffer.from(Config.AesSecretKeyConfiguration);
		let cipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
		let encryptedData = cipher.update(encryptedText, 'hex', 'utf8') + cipher.final('utf8');
		return encryptedData;
	} catch (e) {
		return '';
	}

}

/**
*  convert content type of request
*/


GetKeyByValue = function (object, value) {
	try {
		for (var prop in object) {
			if (object.hasOwnProperty(prop)) {
				if (object[prop].toString() === value.toString())
					return prop;
			}
		}
	} catch (e) {
		return '';
	}

}

/**
*  convert content type of request
*/

ISNULL = function (value, key) {
	try {
		return value ? value == 'undefined' || value == 'null' ? true : false : value == 0 ? false : true;
	} catch (e) {
		return false;
	}

}


/**
*  convert content type of request
*/

TimeConvert = function (num) {
	try {
		const hours = Math.floor(num / 60);
		const minutes = num % 60;
		return `${hours}:${minutes}:00`;
	} catch (e) {
		return false;
	}

}


/**
*  convert content type of request
*/


validateSchema = async (res, inputs, schema, LangMsg) => {

	return new Promise(async (resolve, reject) => {
		const { error, value } = schema.validate(inputs);
		if (error == null) {
			resolve(true)
		} else {
			const message = FormatJoiError(error, LangMsg);
			MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, message, null);
		}
	})

}


/**
*  convert content type of request
*/

allowJson = async (req, res, next) => {
	if (req.is('json'))
		req.headers['content-type'] = 'application/x-www-form-urlencoded';
	next();
}


/**
*  convert content type of request
*/

encryptPassword = (password) => {
	return new Promise( async (resolve, reject) => {
	  try{
		const p = 	bcrypt.hashSync(password);
		resolve(p)
	  }
	  catch(err)
	  {
		  console.log("error",err)
		reject(err)
	  }	
	})

}



/**
*  convert content type of request
*/

decryptPassword = (password, hash) => {
	return new Promise((resolve, reject) => {
		if (!password || !hash) {
			reject([false, '']);
		}
		try {
			bcrypt.compare(password, hash, (err, res) => {
				if(err){
					reject([false, err]);
				}
				resolve(res);
			})
		}
		catch (err) {
			reject([false, err]);
		}
	})
}


/*
   * Method: ConvertInt
   * Purpose: To convert data in javascript number type
   * @param {*} value
   * @response {*} number type value
   */
convertStringToMongoId = (value = null) => {
	return mongoose.Types.ObjectId(value);
}



convertIntoQuery = (filter) => {
	const queries = [];
	const input = filter.split('and');

	input.forEach(element => {
		const fT = element.trim().replace('(', '').replace(')', '');
		if (fT.includes('equal')) {
			const q = fT.split('equal');
			if (q[1].trim()) {
				const nq = {
					[q[0].trim()]: (q[0].trim() == 'roleId' || q[0].trim() == 'speciality.specialityId' || q[0].trim() == 'isActive' || q[0].trim() == 'isApproved') ?
						q[1].trim() : {'$regex': q[1].trim(), "$options" : "i"} 
				}
				if( q[1].trim() != '')
				{
					queries.push(nq)

				}
			}
		}
		// queries.push()
	});
	return queries;
}



generateCode = async (count = 1) => {

	return new Promise((resolve,reject)=>{
		let codes = []
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		for (var j = 0; j < count; j++) {
			let text = "";
			for (var i = 0; i < 9; i++) {
				text += possible.charAt(Math.floor(Math.random() * possible.length)) ;
			}

			codes.push(text)

		}
	
		resolve(codes);
	})

}








module.exports = {
	randomString,
	replaceArrayOfString,
	getRandomInteger,
	ConvertInt,
	ConvertBool,
	generateRandomKey,
	MakeJsonResponse,
	daysdifference,
	CheckNull,
	customTrim,
	FormatException,
	SaveException,
	FormatJoiError,
	AesEncript,
	AesDecript,
	EncodeBase64,
	DecodeBase64,
	GetHashText,
	CompareHashText,
	AesConfigurationEncrypt,
	GenerateOTP,
	AesConfigurationDecrypt,
	GetKeyByValue,
	ISNULL,
	TimeConvert,
	validateSchema,
	allowJson,
	encryptPassword,
	decryptPassword,
	convertStringToMongoId,
	convertIntoQuery,
	generateCode,

}
