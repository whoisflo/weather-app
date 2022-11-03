
const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const port = process.env.PORT || 4000;

app.use(cors())
app.use(express.static(__dirname + '/build'));


// GET ENDPOINTS
app.get('/weather', function (req, res) {

    let reqParam;
    if (req.query.q) reqParam = `q=${req.query.q}`;
    else if (req.query.lat && req.query.lon) reqParam = `lat=${req.query.lat}&lon=${req.query.lon}`;
    else throw new Error('error_location');

    axios.get(`${process.env.WEATHER_API_URL}weather?${reqParam}&units=metric&APPID=${process.env.WEATHER_API_KEY}`)
    .then(response => { res.send(response.data) })
    .catch(error => { throw new Error('error_location') });
});

app.get('/forecast', function (req, res) {

    let reqParam;
    if (req.query.q) reqParam = `q=${req.query.q}`;
    else if (req.query.lat && req.query.lon) reqParam = `lat=${req.query.lat}&lon=${req.query.lon}`;
    else throw new Error('error_location');

    axios.get(`${process.env.WEATHER_API_URL}forecast?${reqParam}&units=metric&APPID=${process.env.WEATHER_API_KEY}`)
    .then(response => { res.send(response.data) })
    .catch(error => { throw new Error('error_location') });
});


// APP 
app.use('/*', function (req, res) {
    res.sendFile(__dirname + '/build/index.html');
});

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});
