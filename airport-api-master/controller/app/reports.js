const Config = require('../../config/Config');
const Util = require('../../util/CustomFunctions');
const airportModel = require('../../model/app/airport');
const schema = require('../../schema/app/airport')




exports.airport = async (req, res, next) => {
    const LangMsg = Config.Msg[req.app.get('lang')];
    try {
        const r = await Util.validateSchema(res, req.query, schema.list(), LangMsg).catch(err => {  })
        if (r) {
            const orderBy  = req.query.orderBy == 'airport_name' ?1:-1; 
            const query = {}
            const u = await airportModel.find(query,{
                airport_name:1,
                fuel_available: 1
            }).sort({_id: orderBy})
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




exports.fuel = async (req, res, next) => {
    const LangMsg = Config.Msg[req.app.get('lang')];
    try {
        const r = await Util.validateSchema(res, req.query, schema.list(), LangMsg).catch(err => {  })
        if (r) {
            const query = {}
            const u = await airportModel.aggregate([
                {
                    $match: {

                    }
                },
                {
                    $lookup: {
                        from: 'transactions',
                        localField: '_id',
                        foreignField: 'airport_id',
                        as: 'transaction'
                    }
                },
                {
                    $unwind: {
                      path: "$transaction",
                      preserveNullAndEmptyArrays: true
                    }
                  },
                  {
                    $lookup: {
                        from: 'aircrafts',
                        localField: 'transactions.airport_id',
                        foreignField: '_id',
                        as: 'transaction.aircraft'
                    }
                },
                {
                    $group :{
                        _id : '$_id',
                        airport_name : {$first: '$airport_name'},
                        fuel_available : {$first: '$fuel_available'},
                        transaction: { $push: "$transaction" },
                    
                    }
                }
            ])
            if (u) {
                return Util.MakeJsonResponse(res, true, Config.Constant.APIResCode.Success, LangMsg.FetchSuccess, u);
            } else {
                Util.MakeJsonResponse(res, false, Config.Constent.APIResCode.MakeJsonResponse, LangMsg.Something_Went_Wrong, null);
            }

        }
    }
    catch (err) {

        console.log(err)
        return Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, LangMsg.Something_Went_Wrong, null);
    }
}
