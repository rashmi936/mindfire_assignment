const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const users = new Schema({
   
    name : {type: String},
    email: {type: String, required: "Email id is required"},
    password: {type: String }
});


module.exports = mongoose.model('users', users);