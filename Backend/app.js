const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
// const flightRoutes = express.Router();
const PORT = 4000;
let FlightSchema = require('./modal/flightSchema');
app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/flight', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})


app.use(express.json())
const flightRoute = require("./routers/api/flightApiRouter")
app.use(flightRoute)

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});