const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const airports = new Schema({
    airport_name : {type: String},
    fuel_capacity: {type: Number, required: "fuel capacity is required"},
    fuel_available: {type: Number , required: "fuel capacity is required"}
});



module.exports = mongoose.model('airports', airports);