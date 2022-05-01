const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Flights = new Schema({
    flightsName: {
        type: String
    },
    flightsSource: {
        type: String,
    },
	flightsDestination: {
        type: String,
    },
    flightsDate: {
        type: Date,
        // default: new Date()
    },
    flightsPrice :{
        type: String
    },
    numberOfSeats:{
        type:Number,
        default:20
    }
});
module.exports = mongoose.model('Flights', Flights);