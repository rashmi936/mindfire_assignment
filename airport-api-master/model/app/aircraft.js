const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const aircraft = new Schema({
   
    aircraft_no : {type: String},
    airline: {type: String},
    source: {type: String},
    destination: {type: String}
});


module.exports = mongoose.model('aircrafts', aircraft);