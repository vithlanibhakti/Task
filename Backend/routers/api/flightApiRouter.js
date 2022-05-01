const express = require("express")
const FlightSchema = require("../../modal/flightSchema")
const flightRoutes = express.Router();
const moment = require("moment")

flightRoutes.route('/').get(function (req, res) {
    FlightSchema.find(function (err, flight) {
        if (err) {
            console.log(err);
        } else {
            res.json(flight);
        }
    });
});
flightRoutes.route('/searchflights').get(async (req, res) => {
    if (req?.query?.source === req?.query?.destination) {
        res.status(200).send({ data: [], "message": "Source and Destination can not be same!" });
    }
    else {
        let currentDate = new Date(req?.query?.date).toISOString().split("T")[0];
        const flight = await FlightSchema.find({
            flightsSource: req?.query?.source.trim(),
            flightsDestination: req?.query?.destination.trim(),
            flightsDate : currentDate
        },
        )
        if (flight.length <= 0) {
            res.status(200).send({ data: flight, "message": "data is not found" });
        }
        else {
            res.json({ data: flight });
        }
    }
});
flightRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    FlightSchema.findById(id, function (err, flight) {
        res.json(flight);
    });
});
flightRoutes.route('/update/:id').post(function (req, res) {
    FlightSchema.findById(req.params.id, function (err, flight) {
        if (!flight)
            res.status(404).send("data is not found");
        else
            flight.flightsDescription = req.body.flightsDescription;
        flight.flightsName = req.body.flightsName;
        flight.flightsFromDate = req.body.flightsFromDate;
        flight.flightsToDate = req.body.flightsToDate;
        flight.save().then(flight => {
            res.json('FlightSchema updated!');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});
flightRoutes.route('/add').post(function (req, res) {
    let flight = new FlightSchema(req.body);

    flight.save()
        .then(flight => {
            res.status(200).json({ data: flight, "message": "successfully..!!", "status": 'sucess' })
        })
        .catch(err => {
            res.send({ data: [], "error": err.message, "status": 'error' });
        });
});

module.exports = flightRoutes

