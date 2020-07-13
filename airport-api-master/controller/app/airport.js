const Config = require('../../config/Config');
const Util = require('../../util/CustomFunctions');
const airportModel = require('../../model/app/airport');
const schema = require('../../schema/app/airport')

exports.add = async (req, res, next) => {
    const LangMsg = Config.Msg[req.app.get('lang')];
    try {
        const r = await Util.validateSchema(res, req.body, schema.add(), LangMsg).catch(err => {  })
        if (r) {
            const airportInput = new airportModel(req.body);
            const response = await airportInput.save();
            return Util.MakeJsonResponse(res, true, Config.Constant.APIResCode.Success, LangMsg.CreatedSuccess, null);
        }
    }
    catch (err) {
        console.log(err)
        return Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, LangMsg.Something_Went_Wrong, null);
    }

}



exports.list = async (req, res, next) => {
    const LangMsg = Config.Msg[req.app.get('lang')];
    try {
        const r = await Util.validateSchema(res, req.query, schema.list(), LangMsg).catch(err => {  })
        if (r) {
            const query = {}
            const u = await airportModel.find(query).sort({airport_name: 1})
            if (u) {
                return Util.MakeJsonResponse(res, true, Config.Constant.APIResCode.Success, LangMsg.FetchSuccess, u);
            } else {
                Util.MakeJsonResponse(res, false, Config.Constent.APIResCode.MakeJsonResponse, LangMsg.Something_Went_Wrong, null);
            }

        }
    }
    catch (err) {
        return Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, LangMsg.Something_Went_Wrong, null);
    }

}




