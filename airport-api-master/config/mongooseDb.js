'use strict';
const mongoose = require('mongoose');
const Config = require('./Config');

// Bring Mongoose into the app
let DBOptions = {
    useCreateIndex: true,
    useNewUrlParser:true
};
mongoose.Promise = global.Promise;
console.log("manoggose con init...");
// Create the database connection 
//mongoose.connect(Config.MongoDb.Database,DBOptions);
mongoose.connect(Config.MongoDb.Database,DBOptions)
  .then(() => {})
  .catch((err) => {console.error("Mongoose connection error ====>>",err)});
// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function() {
    console.log('Mongoose connection open to ' +Config.MongoDb.Database);
});

// If the connection throws an error
mongoose.connection.on('error', function(err) {
    //console.log('Mongoose default connection error: ' , err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose connection disconnected');
});


// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        //console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
module.exports = '';
