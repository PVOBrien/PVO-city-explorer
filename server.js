'use strict';

const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const { request } = require('express');
app.use(cors());

app.use(express.static('./public')); // TODO: Remember the . DOT! otherwise it's looking for a file not a path to folder.

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});

app.get('/location', (request, response) => {
  try{
    // console.log(request.query.city);
    let city = request.query.city;
    let geoData = require('./data/location.json');

    const obj = new Location(city, geoData);

    response.send(obj);

  } catch(error){
    console.log('Error', error);
    response.status(500).send('we made a boo-boo! sori!');
  }

  function Location(location,geoData){
    this.search_query = location;
    this.formatted_query = geoData[0].display_name;
    this.latitude = geoData[0].lat;
    this.longitude = geoData[0].lon;
  }
});

app.get('/weather', (request, response) => {
  try{
    console.log(request.query.weather); // TODO: what is query???
    // let weather = request.query.weather; // TODO: This is "dummy" data. It's just pulling whatever,
    let weatherData = require('./data/weather.json');
    let weatherDayArray = [];
    // BELOW: ARROW NOTATION to iterate over the data[] items.

    weatherData.data.forEach(day => {
      weatherDayArray.push(new WeatherReport(day));
    });

    // const obj = new WeatherReport(weatherData); // old school single item invocation
    // weatherDayArray.push(obj); // single item invocation push into weatherDayArray

    response.status(200).send(weatherDayArray);

  } catch(error) {
    console.log('Error', error);
    response.status(500).send('if it broke, I guess I\'ll fix it?');
  }

  function WeatherReport(weatherData){
    this.forecast = weatherData.data[0].weather.description;
    this.time = weatherData.data[0].datetime;
  }
});

app.get('*', (request, response) => {
  response.status(404).send('Page not Found. -p');
}); //Always include these for a cleaner look.
