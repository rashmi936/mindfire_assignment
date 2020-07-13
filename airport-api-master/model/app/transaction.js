const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const airport = require('./airport')



const transaction = new Schema({
  
    transaction_date_time : {type: Date,  default: Date.now},
    transaction_type: {type: String, enum: ['IN','OUT']},
    airport_id: {type: Schema.Types.ObjectId},
    aircraft_id: {type: Schema.Types.ObjectId},
    quantity: {type: Number},
    transaction_id_parent: {type:  Schema.Types.ObjectId}
});









module.exports = mongoose.model('transactions', transaction);