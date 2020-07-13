const Config = require('../../config/Config');
const Util = require('../../util/CustomFunctions');
const airportModel = require('../../model/app/airport');
const transctionModel = require('../../model/app/transaction');

const schema = require('../../schema/app/transaction')

exports.add = async (req, res, next) => {
    const LangMsg = Config.Msg[req.app.get('lang')];
    try {
        const r = await Util.validateSchema(res, req.body, schema.add(), LangMsg).catch(err => {  })
        if (r) {

            if(req.body.aircraft_id == ''){
                delete req.body.aircraft_id;
            }
            const airportInput = new transctionModel(req.body);
            const response = await airportInput.save();
              await  airportModel.updateOne(
                  {_id : Util.convertStringToMongoId(response.airport_id)},
              { $inc : {
                  fuel_available: response.transaction_type == 'OUT' ?  - response.quantity :  response.quantity  
                }
             });
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
            const u = await transctionModel.aggregate([
                {
                    $match: {

                    }
                },
                {
                    $lookup: {
                        from: 'airports',
                        localField: 'airport_id',
                        foreignField: '_id',
                        as: 'airport'
                    }
                },
                {
                    $lookup: {
                        from: 'aircrafts',
                        localField: 'aircraft_id',
                        foreignField: '_id',
                        as: 'aircraft'
                    }
                }
                ,{
                    $sort : {
                        _id :-1
                    }
                },
                {
                    $project :{
                        _id:1,
                        transaction_type:1,
                        airport_id:1,
                        quantity:1,
                        transaction_date_time:1,
                        airport:{ $arrayElemAt: [ "$airport.airport_name", 0 ] },
                        aircraft:{ $arrayElemAt: [ "$aircraft.aircraft_no", 0 ] }
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



exports.reverseTransction = async (req, res, next) => {
    const LangMsg = Config.Msg[req.app.get('lang')];
    try {
        const r = await Util.validateSchema(res, req.params, schema.reverseTransction(), LangMsg).catch(err => {  })
        if (r) {
            const t  = await transctionModel.findOne({_id: Util.convertStringToMongoId(req.params.id)});


            await  airportModel.updateOne(
                {_id : Util.convertStringToMongoId(t.airport_id)},
            { $inc : {
                fuel_available: t.transaction_type == 'OUT' ?   t.quantity : - t.quantity  
              }
           });
          

            t.transaction_type = t.transaction_type == 'OUT'? "IN":"OUT";

            
            const response = await  new transctionModel({
                transaction_type: t.transaction_type,
                airport_id:t.airport_id,
                aircraft_id:t.aircraft_id,
                quantity:t.quantity,
                transaction_id_parent: t._id,
            }).save();

             
             return Util.MakeJsonResponse(res, true, Config.Constant.APIResCode.Success, LangMsg.CreatedSuccess, null);
        }
    }
    catch (err) {
        console.log(err)
        return Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, LangMsg.Something_Went_Wrong, null);
    }

}



exports.removeTransctions = async (req, res, next) => {
    const LangMsg = Config.Msg[req.app.get('lang')];
    try {
        const t  = await transctionModel.remove({}); 
        return Util.MakeJsonResponse(res, true, Config.Constant.APIResCode.Success, LangMsg.DeletedSuccess, null);
    }
    catch (err) {
        console.log(err)
        return Util.MakeJsonResponse(res, false, Config.Constant.APIResCode.BadRequest, LangMsg.Something_Went_Wrong, null);
    }

}
