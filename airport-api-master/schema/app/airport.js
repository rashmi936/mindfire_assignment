const Joi = require('@hapi/joi');



add = () => {
    return Joi.object().keys({
        airport_name :Joi.string().max(200).required(),
        fuel_capacity: Joi.number().required(),
        fuel_available: Joi.number().required()
    });
}


list = () => {
    return Joi.object().keys({
        sort: Joi.string().max(200).optional().allow(''),
        orderBy: Joi.string().max(200).optional().allow(''),
    });
}







module.exports = {
    add,
    list,
    
}