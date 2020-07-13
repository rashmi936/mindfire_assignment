const Joi = require('@hapi/joi');



add = () => {
    return Joi.object().keys({
        aircraft_no : Joi.string().max(200).required(),
        airline: Joi.string().max(200).required(),
        source: Joi.string().max(200).required(),
        destination: Joi.string().max(200).required()
    });
}


list = () => {
    return Joi.object().keys({
       
    });
}







module.exports = {
    add,
    list,

}