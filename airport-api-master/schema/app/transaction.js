const Joi = require('@hapi/joi');
const { reverse } = require('../../controller/app/transaction');



add = () => {
    return Joi.object().keys({
        transaction_type: Joi.string().optional().allow(''),
        airport_id:Joi.string().max(200).required(),
        aircraft_id:Joi.string().optional().allow(''),
        quantity: Joi.number().required(),
        transaction_id_parent: Joi.string().optional().allow(''),

    });
}


list = () => {
    return Joi.object().keys({
        sort: Joi.string().max(200).optional().allow(''),
        orderBy: Joi.string().max(200).optional().allow(''),
    });
}



reverseTransction = () => {
    return Joi.object().keys({
        id: Joi.string().max(200).required()
    });
}





module.exports = {
    add,
    list,
    reverseTransction
    
}